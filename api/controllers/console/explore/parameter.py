# -*- coding:utf-8 -*-
from flask_restful import marshal_with, fields
from flask import current_app

from controllers.console import api
from controllers.console.explore.wraps import InstalledAppResource

from models.model import InstalledApp


class AppParameterApi(InstalledAppResource):
    """Resource for app variables."""
    variable_fields = {
        'key': fields.String,
        'name': fields.String,
        'description': fields.String,
        'type': fields.String,
        'default': fields.String,
        'max_length': fields.Integer,
        'options': fields.List(fields.String)
    }

    system_parameters_fields = {
        'image_file_size_limit': fields.String
    }

    parameters_fields = {
        'opening_statement': fields.String,
        'opening_suggestions': fields.Raw,
        'suggested_questions': fields.Raw,
        'suggested_questions_after_answer': fields.Raw,
        'speech_to_text': fields.Raw,
        'retriever_resource': fields.Raw,
        'more_like_this': fields.Raw,
        'user_input_form': fields.Raw,
        'sensitive_word_avoidance': fields.Raw,
        'file_upload': fields.Raw,
        'system_parameters': fields.Nested(system_parameters_fields)
    }

    @marshal_with(parameters_fields)
    def get(self, installed_app: InstalledApp):
        """Retrieve app parameters."""
        app_model = installed_app.app
        app_model_config = app_model.app_model_config

        return {
            'opening_statement': app_model_config.opening_statement,
            'opening_suggestions': app_model_config.opening_suggestions_list,
            'suggested_questions': app_model_config.suggested_questions_list,
            'suggested_questions_after_answer': app_model_config.suggested_questions_after_answer_dict,
            'speech_to_text': app_model_config.speech_to_text_dict,
            'retriever_resource': app_model_config.retriever_resource_dict,
            'more_like_this': app_model_config.more_like_this_dict,
            'user_input_form': app_model_config.user_input_form_list,
            'sensitive_word_avoidance': app_model_config.sensitive_word_avoidance_dict,
            'file_upload': app_model_config.file_upload_dict,
            'system_parameters': {
                'image_file_size_limit': current_app.config.get('UPLOAD_IMAGE_FILE_SIZE_LIMIT')
            }
        }


api.add_resource(AppParameterApi, '/installed-apps/<uuid:installed_app_id>/parameters', endpoint='installed_app_parameters')
