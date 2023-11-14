'use client'
import type { FC } from 'react'
import React, { useRef } from 'react'
import { useContext } from 'use-context-selector'
import produce from 'immer'
import { useBoolean, useScroll } from 'ahooks'
import DatasetConfig from '../dataset-config'
import Tools from '../tools'
import ChatGroup from '../features/chat-group'
import ExperienceEnchanceGroup from '../features/experience-enchance-group'
import Toolbox from '../toolbox'
import HistoryPanel from '../config-prompt/conversation-histroy/history-panel'
import ConfigVision from '../config-vision'
import AddFeatureBtn from './feature/add-feature-btn'
import ChooseFeature from './feature/choose-feature'
import useFeature from './feature/use-feature'
import AdvancedModeWaring from '@/app/components/app/configuration/prompt-mode/advanced-mode-waring'
import ConfigContext from '@/context/debug-configuration'
import ConfigPrompt from '@/app/components/app/configuration/config-prompt'
import ConfigVar from '@/app/components/app/configuration/config-var'
import type { PromptVariable } from '@/models/debug'
import { AppType, ModelModeType } from '@/types/app'
import { useProviderContext } from '@/context/provider-context'
import { useModalContext } from '@/context/modal-context'

const Config: FC = () => {
  const {
    mode,
    isAdvancedMode,
    modelModeType,
    canReturnToSimpleMode,
    hasSetBlockStatus,
    showHistoryModal,
    introduction,
    setIntroduction,
    openingSuggestions,
    setOpeningSuggestions,
    modelConfig,
    setModelConfig,
    setPrevPromptConfig,
    setFormattingChanged,
    moreLikeThisConfig,
    setMoreLikeThisConfig,
    suggestedQuestionsAfterAnswerConfig,
    setSuggestedQuestionsAfterAnswerConfig,
    speechToTextConfig,
    setSpeechToTextConfig,
    citationConfig,
    setCitationConfig,
    moderationConfig,
    setModerationConfig,
  } = useContext(ConfigContext)
  const isChatApp = mode === AppType.chat
  const { speech2textDefaultModel } = useProviderContext()
  const { setShowModerationSettingModal } = useModalContext()

  const promptTemplate = modelConfig.configs.prompt_template;
  const promptVariables = modelConfig.configs.prompt_variables;
  // simple mode
  const handlePromptChange = (
    newTemplate: string,
    newVariables: PromptVariable[]
  ) => {
    const newModelConfig = produce(modelConfig, (draft) => {
      draft.configs.prompt_template = newTemplate;
      draft.configs.prompt_variables = [
        ...draft.configs.prompt_variables,
        ...newVariables,
      ];
    });

    if (modelConfig.configs.prompt_template !== newTemplate)
      setFormattingChanged(true);

    setPrevPromptConfig(modelConfig.configs);
    setModelConfig(newModelConfig);
  };

  const handlePromptVariablesNameChange = (newVariables: PromptVariable[]) => {
    setPrevPromptConfig(modelConfig.configs);
    const newModelConfig = produce(modelConfig, (draft) => {
      draft.configs.prompt_variables = newVariables;
    });
    setModelConfig(newModelConfig);
  };

  const [
    showChooseFeature,
    { setTrue: showChooseFeatureTrue, setFalse: showChooseFeatureFalse },
  ] = useBoolean(false);
  const { featureConfig, handleFeatureChange } = useFeature({
    introduction,
    setIntroduction,
    openingSuggestions,
    setOpeningSuggestions,
    moreLikeThis: moreLikeThisConfig.enabled,
    setMoreLikeThis: (value) => {
      setMoreLikeThisConfig(
        produce(moreLikeThisConfig, (draft) => {
          draft.enabled = value;
        })
      );
    },
    suggestedQuestionsAfterAnswer: suggestedQuestionsAfterAnswerConfig.enabled,
    setSuggestedQuestionsAfterAnswer: (value) => {
      setSuggestedQuestionsAfterAnswerConfig(
        produce(suggestedQuestionsAfterAnswerConfig, (draft) => {
          draft.enabled = value;
        })
      );
    },
    speechToText: speechToTextConfig.enabled,
    setSpeechToText: (value) => {
      setSpeechToTextConfig(
        produce(speechToTextConfig, (draft) => {
          draft.enabled = value;
        })
      );
    },
    citation: citationConfig.enabled,
    setCitation: (value) => {
      setCitationConfig(
        produce(citationConfig, (draft) => {
          draft.enabled = value;
        })
      );
    },
    moderation: moderationConfig.enabled,
    setModeration: (value) => {
      setModerationConfig(produce(moderationConfig, (draft) => {
        draft.enabled = value
      }))
      if (value && !moderationConfig.type) {
        setShowModerationSettingModal({
          payload: {
            enabled: true,
            type: 'keywords',
            config: {
              keywords: '',
              inputs_config: {
                enabled: true,
                preset_response: '',
              },
            },
          },
          onSaveCallback: setModerationConfig,
          onCancelCallback: () => {
            setModerationConfig(produce(moderationConfig, (draft) => {
              draft.enabled = false
              showChooseFeatureTrue()
            }))
          },
        })
        showChooseFeatureFalse()
      }
    },
  })

  const hasChatConfig =
    isChatApp &&
    (featureConfig.openingStatement ||
      featureConfig.suggestedQuestionsAfterAnswer ||
      featureConfig.openingSuggestions ||
      (featureConfig.speechToText && !!speech2textDefaultModel) ||
      featureConfig.citation);
  const hasToolbox = false;

  const wrapRef = useRef<HTMLDivElement>(null);
  const wrapScroll = useScroll(wrapRef);
  const toBottomHeight = (() => {
    if (!wrapRef.current) return 999;
    const elem = wrapRef.current;
    const { clientHeight } = elem;
    const value = (wrapScroll?.top || 0) + clientHeight;
    return value;
  })();

  return (
    <>
      <div
        ref={wrapRef}
        className="relative px-6 pb-[50px] overflow-y-auto h-full"
      >
        <AddFeatureBtn
          toBottomHeight={toBottomHeight}
          onClick={showChooseFeatureTrue}
        />
        {isAdvancedMode && canReturnToSimpleMode && <AdvancedModeWaring />}
        {showChooseFeature && (
          <ChooseFeature
            isShow={showChooseFeature}
            onClose={showChooseFeatureFalse}
            isChatApp={isChatApp}
            config={featureConfig}
            onChange={handleFeatureChange}
            showSpeechToTextItem={!!speech2textDefaultModel}
          />
        )}

        {/* Template */}
        <ConfigPrompt
          mode={mode as AppType}
          promptTemplate={promptTemplate}
          promptVariables={promptVariables}
          onChange={handlePromptChange}
        />

        {/* Variables */}
        <ConfigVar
          promptVariables={promptVariables}
          onPromptVariablesChange={handlePromptVariablesNameChange}
        />

        {/* Dataset */}
        <DatasetConfig />

        <Tools />

        <ConfigVision />

        {/* Chat History */}
        {isAdvancedMode &&
          isChatApp &&
          modelModeType === ModelModeType.completion && (
            <HistoryPanel
              showWarning={!hasSetBlockStatus.history}
              onShowEditModal={showHistoryModal}
            />
          )}

        {/* ChatConifig */}
        {hasChatConfig && (
          <ChatGroup
            isShowOpeningStatement={featureConfig.openingStatement}
            openingStatementConfig={{
              value: introduction,
              onChange: setIntroduction,
            }}
            openingSuggestionsConfig={{
              value: openingSuggestions,
              onChange: setOpeningSuggestions,
            }}
            isShowOpeningSuggestions={featureConfig.openingSuggestions}
            isShowSuggestedQuestionsAfterAnswer={
              featureConfig.suggestedQuestionsAfterAnswer
            }
            isShowSpeechText={
              featureConfig.speechToText && !!speech2textDefaultModel
            }
            isShowCitation={featureConfig.citation}
          />
        )}

        {/* TextnGeneration config */}
        {moreLikeThisConfig.enabled && <ExperienceEnchanceGroup />}

        {/* Toolbox */}
        {
          moderationConfig.enabled && (
            <Toolbox showModerationSettings />
          )
        }
      </div>
    </>
  );
};
export default React.memo(Config);
