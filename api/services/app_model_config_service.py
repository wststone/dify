import re
import uuid

from core.agent.agent_executor import PlanningStrategy
from core.model_providers.model_provider_factory import ModelProviderFactory
from core.model_providers.models.entity.model_params import ModelType, ModelMode
from models.account import Account
from services.dataset_service import DatasetService


SUPPORT_TOOLS = ["dataset", "google_search", "web_reader", "wikipedia", "current_datetime"]


class AppModelConfigService:
    @staticmethod
    def is_dataset_exists(account: Account, dataset_id: str) -> bool:
        # verify if the dataset ID exists
        dataset = DatasetService.get_dataset(dataset_id)

        if not dataset:
            return False

        if dataset.tenant_id != account.current_tenant_id:
            return False

        return True

    @staticmethod
    def validate_model_completion_params(cp: dict, model_name: str) -> dict:
        # 6. model.completion_params
        if not isinstance(cp, dict):
            raise ValueError("model.completion_params must be of object type")

        # max_tokens
        if 'max_tokens' not in cp:
            cp["max_tokens"] = 512

        # temperature
        if 'temperature' not in cp:
            cp["temperature"] = 1

        # top_p
        if 'top_p' not in cp:
            cp["top_p"] = 1

        # presence_penalty
        if 'presence_penalty' not in cp:
            cp["presence_penalty"] = 0

        # presence_penalty
        if 'frequency_penalty' not in cp:
            cp["frequency_penalty"] = 0

        # stop
        if 'stop' not in cp:
            cp["stop"] = []
        elif not isinstance(cp["stop"], list):
            raise ValueError("stop in model.completion_params must be of list type")

        # Filter out extra parameters
        filtered_cp = {
            "max_tokens": cp["max_tokens"],
            "temperature": cp["temperature"],
            "top_p": cp["top_p"],
            "presence_penalty": cp["presence_penalty"],
            "frequency_penalty": cp["frequency_penalty"],
            "stop": cp["stop"]
        }

        return filtered_cp

    @staticmethod
    def validate_configuration(tenant_id: str, account: Account, config: dict, mode: str) -> dict:
        # opening_statement
        if 'opening_statement' not in config or not config["opening_statement"]:
            config["opening_statement"] = ""

        if not isinstance(config["opening_statement"], str):
            raise ValueError("opening_statement must be of string type")

        # suggested_questions
        if 'suggested_questions' not in config or not config["suggested_questions"]:
            config["suggested_questions"] = []

        if not isinstance(config["suggested_questions"], list):
            raise ValueError("suggested_questions must be of list type")

        for question in config["suggested_questions"]:
            if not isinstance(question, str):
                raise ValueError("Elements in suggested_questions list must be of string type")

        # suggested_questions_after_answer
        if 'suggested_questions_after_answer' not in config or not config["suggested_questions_after_answer"]:
            config["suggested_questions_after_answer"] = {
                "enabled": False
            }

        if not isinstance(config["suggested_questions_after_answer"], dict):
            raise ValueError("suggested_questions_after_answer must be of dict type")

        if "enabled" not in config["suggested_questions_after_answer"] or not config["suggested_questions_after_answer"]["enabled"]:
            config["suggested_questions_after_answer"]["enabled"] = False

        if not isinstance(config["suggested_questions_after_answer"]["enabled"], bool):
            raise ValueError("enabled in suggested_questions_after_answer must be of boolean type")

        # speech_to_text
        if 'speech_to_text' not in config or not config["speech_to_text"]:
            config["speech_to_text"] = {
                "enabled": False
            }

        if not isinstance(config["speech_to_text"], dict):
            raise ValueError("speech_to_text must be of dict type")

        if "enabled" not in config["speech_to_text"] or not config["speech_to_text"]["enabled"]:
            config["speech_to_text"]["enabled"] = False

        if not isinstance(config["speech_to_text"]["enabled"], bool):
            raise ValueError("enabled in speech_to_text must be of boolean type")

        # return retriever resource
        if 'retriever_resource' not in config or not config["retriever_resource"]:
            config["retriever_resource"] = {
                "enabled": False
            }

        if not isinstance(config["retriever_resource"], dict):
            raise ValueError("retriever_resource must be of dict type")

        if "enabled" not in config["retriever_resource"] or not config["retriever_resource"]["enabled"]:
            config["retriever_resource"]["enabled"] = False

        if not isinstance(config["retriever_resource"]["enabled"], bool):
            raise ValueError("enabled in speech_to_text must be of boolean type")

        # more_like_this
        if 'more_like_this' not in config or not config["more_like_this"]:
            config["more_like_this"] = {
                "enabled": False
            }

        if not isinstance(config["more_like_this"], dict):
            raise ValueError("more_like_this must be of dict type")

        if "enabled" not in config["more_like_this"] or not config["more_like_this"]["enabled"]:
            config["more_like_this"]["enabled"] = False

        if not isinstance(config["more_like_this"]["enabled"], bool):
            raise ValueError("enabled in more_like_this must be of boolean type")

        # sensitive_word_avoidance
        if 'sensitive_word_avoidance' not in config or not config["sensitive_word_avoidance"]:
            config["sensitive_word_avoidance"] = {
                "enabled": False
            }

        if not isinstance(config["sensitive_word_avoidance"], dict):
            raise ValueError("sensitive_word_avoidance must be of dict type")

        if "enabled" not in config["sensitive_word_avoidance"] or not config["sensitive_word_avoidance"]["enabled"]:
            config["sensitive_word_avoidance"]["enabled"] = False

        if not isinstance(config["sensitive_word_avoidance"]["enabled"], bool):
            raise ValueError("enabled in sensitive_word_avoidance must be of boolean type")

        if "words" not in config["sensitive_word_avoidance"] or not config["sensitive_word_avoidance"]["words"]:
            config["sensitive_word_avoidance"]["words"] = ""

        if not isinstance(config["sensitive_word_avoidance"]["words"], str):
            raise ValueError("words in sensitive_word_avoidance must be of string type")

        if "canned_response" not in config["sensitive_word_avoidance"] or not config["sensitive_word_avoidance"]["canned_response"]:
            config["sensitive_word_avoidance"]["canned_response"] = ""

        if not isinstance(config["sensitive_word_avoidance"]["canned_response"], str):
            raise ValueError("canned_response in sensitive_word_avoidance must be of string type")

        # model
        if 'model' not in config:
            raise ValueError("model is required")

        if not isinstance(config["model"], dict):
            raise ValueError("model must be of object type")

        # model.provider
        model_provider_names = ModelProviderFactory.get_provider_names()
        if 'provider' not in config["model"] or config["model"]["provider"] not in model_provider_names:
            raise ValueError(f"model.provider is required and must be in {str(model_provider_names)}")

        # model.name
        if 'name' not in config["model"]:
            raise ValueError("model.name is required")

        model_provider = ModelProviderFactory.get_preferred_model_provider(tenant_id, config["model"]["provider"])
        if not model_provider:
            raise ValueError("model.name must be in the specified model list")

        model_list = model_provider.get_supported_model_list(ModelType.TEXT_GENERATION)
        model_ids = [m['id'] for m in model_list]
        if config["model"]["name"] not in model_ids:
            raise ValueError("model.name must be in the specified model list")
        
        # model.mode
        if 'mode' not in config['model'] or not config['model']["mode"]:
            config['model']["mode"] = ""

        # model.completion_params
        if 'completion_params' not in config["model"]:
            raise ValueError("model.completion_params is required")

        config["model"]["completion_params"] = AppModelConfigService.validate_model_completion_params(
            config["model"]["completion_params"],
            config["model"]["name"]
        )

        # user_input_form
        if "user_input_form" not in config or not config["user_input_form"]:
            config["user_input_form"] = []

        if not isinstance(config["user_input_form"], list):
            raise ValueError("user_input_form must be a list of objects")

        variables = []
        for item in config["user_input_form"]:
            key = list(item.keys())[0]
            if key not in ["text-input", "select", "paragraph"]:
                raise ValueError("Keys in user_input_form list can only be 'text-input', 'paragraph'  or 'select'")

            form_item = item[key]
            if 'label' not in form_item:
                raise ValueError("label is required in user_input_form")

            if not isinstance(form_item["label"], str):
                raise ValueError("label in user_input_form must be of string type")

            if 'variable' not in form_item:
                raise ValueError("variable is required in user_input_form")

            if not isinstance(form_item["variable"], str):
                raise ValueError("variable in user_input_form must be of string type")

            pattern = re.compile(r"^(?!\d)[\u4e00-\u9fa5A-Za-z0-9_\U0001F300-\U0001F64F\U0001F680-\U0001F6FF]{1,100}$")
            if pattern.match(form_item["variable"]) is None:
                raise ValueError("variable in user_input_form must be a string, "
                                 "and cannot start with a number")

            variables.append(form_item["variable"])

            if 'required' not in form_item or not form_item["required"]:
                form_item["required"] = False

            if not isinstance(form_item["required"], bool):
                raise ValueError("required in user_input_form must be of boolean type")

            if key == "select":
                if 'options' not in form_item or not form_item["options"]:
                    form_item["options"] = []

                if not isinstance(form_item["options"], list):
                    raise ValueError("options in user_input_form must be a list of strings")

                if "default" in form_item and form_item['default'] \
                        and form_item["default"] not in form_item["options"]:
                    raise ValueError("default value in user_input_form must be in the options list")

        # pre_prompt
        if "pre_prompt" not in config or not config["pre_prompt"]:
            config["pre_prompt"] = ""

        if not isinstance(config["pre_prompt"], str):
            raise ValueError("pre_prompt must be of string type")

        template_vars = re.findall(r"\{\{(\w+)\}\}", config["pre_prompt"])
        for var in template_vars:
            if var not in variables:
                raise ValueError("Template variables in pre_prompt must be defined in user_input_form")

        # agent_mode
        if "agent_mode" not in config or not config["agent_mode"]:
            config["agent_mode"] = {
                "enabled": False,
                "tools": []
            }

        if not isinstance(config["agent_mode"], dict):
            raise ValueError("agent_mode must be of object type")

        if "enabled" not in config["agent_mode"] or not config["agent_mode"]["enabled"]:
            config["agent_mode"]["enabled"] = False

        if not isinstance(config["agent_mode"]["enabled"], bool):
            raise ValueError("enabled in agent_mode must be of boolean type")

        if "strategy" not in config["agent_mode"] or not config["agent_mode"]["strategy"]:
            config["agent_mode"]["strategy"] = PlanningStrategy.ROUTER.value

        if config["agent_mode"]["strategy"] not in [member.value for member in list(PlanningStrategy.__members__.values())]:
            raise ValueError("strategy in agent_mode must be in the specified strategy list")

        if "tools" not in config["agent_mode"] or not config["agent_mode"]["tools"]:
            config["agent_mode"]["tools"] = []

        if not isinstance(config["agent_mode"]["tools"], list):
            raise ValueError("tools in agent_mode must be a list of objects")

        for tool in config["agent_mode"]["tools"]:
            key = list(tool.keys())[0]
            if key not in SUPPORT_TOOLS:
                raise ValueError("Keys in agent_mode.tools must be in the specified tool list")

            tool_item = tool[key]

            if "enabled" not in tool_item or not tool_item["enabled"]:
                tool_item["enabled"] = False

            if not isinstance(tool_item["enabled"], bool):
                raise ValueError("enabled in agent_mode.tools must be of boolean type")

            if key == "dataset":
                if 'id' not in tool_item:
                    raise ValueError("id is required in dataset")

                try:
                    uuid.UUID(tool_item["id"])
                except ValueError:
                    raise ValueError("id in dataset must be of UUID type")

                if not AppModelConfigService.is_dataset_exists(account, tool_item["id"]):
                    raise ValueError("Dataset ID does not exist, please check your permission.")
        
        # dataset_query_variable
        AppModelConfigService.is_dataset_query_variable_valid(config, mode)

        # advanced prompt validation
        AppModelConfigService.is_advanced_prompt_valid(config, mode)

        # Filter out extra parameters
        filtered_config = {
            "opening_statement": config["opening_statement"],
            "suggested_questions": config["suggested_questions"],
            "suggested_questions_after_answer": config["suggested_questions_after_answer"],
            "speech_to_text": config["speech_to_text"],
            "retriever_resource": config["retriever_resource"],
            "more_like_this": config["more_like_this"],
            "sensitive_word_avoidance": config["sensitive_word_avoidance"],
            "model": {
                "provider": config["model"]["provider"],
                "name": config["model"]["name"],
                "mode": config['model']["mode"],
                "completion_params": config["model"]["completion_params"]
            },
            "user_input_form": config["user_input_form"],
            "dataset_query_variable": config.get('dataset_query_variable'),
            "pre_prompt": config["pre_prompt"],
            "agent_mode": config["agent_mode"],
            "prompt_type": config["prompt_type"],
            "chat_prompt_config": config["chat_prompt_config"],
            "completion_prompt_config": config["completion_prompt_config"],
            "dataset_configs": config["dataset_configs"]
        }

        return filtered_config
    
    @staticmethod
    def is_dataset_query_variable_valid(config: dict, mode: str) -> None:
        # Only check when mode is completion
        if mode != 'completion':
            return
        
        agent_mode = config.get("agent_mode", {})
        tools = agent_mode.get("tools", [])
        dataset_exists = "dataset" in str(tools)
        
        dataset_query_variable = config.get("dataset_query_variable")

        if dataset_exists and not dataset_query_variable:
            raise ValueError("Dataset query variable is required when dataset is exist")
        

    @staticmethod
    def is_advanced_prompt_valid(config: dict, app_mode: str) -> None:
        # prompt_type
        if 'prompt_type' not in config or not config["prompt_type"]:
            config["prompt_type"] = "simple"

        if config['prompt_type'] not in ['simple', 'advanced']:
            raise ValueError("prompt_type must be in ['simple', 'advanced']")
        
        # chat_prompt_config
        if 'chat_prompt_config' not in config or not config["chat_prompt_config"]:
            config["chat_prompt_config"] = {}

        if not isinstance(config["chat_prompt_config"], dict):
            raise ValueError("chat_prompt_config must be of object type")

        # completion_prompt_config
        if 'completion_prompt_config' not in config or not config["completion_prompt_config"]:
            config["completion_prompt_config"] = {}

        if not isinstance(config["completion_prompt_config"], dict):
            raise ValueError("completion_prompt_config must be of object type")
        
        # dataset_configs
        if 'dataset_configs' not in config or not config["dataset_configs"]:
            config["dataset_configs"] = {"top_k": 2, "score_threshold": {"enable": False}}

        if not isinstance(config["dataset_configs"], dict):
            raise ValueError("dataset_configs must be of object type")

        if config['prompt_type'] == 'advanced':
            if not config['chat_prompt_config'] and not config['completion_prompt_config']:
                raise ValueError("chat_prompt_config or completion_prompt_config is required when prompt_type is advanced")
            
            if config['model']["mode"] not in ['chat', 'completion']:
                raise ValueError("model.mode must be in ['chat', 'completion'] when prompt_type is advanced")
            
            if app_mode == 'chat' and config['model']["mode"] == ModelMode.COMPLETION.value:
                user_prefix = config['completion_prompt_config']['conversation_histories_role']['user_prefix']
                assistant_prefix = config['completion_prompt_config']['conversation_histories_role']['assistant_prefix']

                if not user_prefix:
                    config['completion_prompt_config']['conversation_histories_role']['user_prefix'] = 'Human'

                if not assistant_prefix:
                    config['completion_prompt_config']['conversation_histories_role']['assistant_prefix'] = 'Assistant'
