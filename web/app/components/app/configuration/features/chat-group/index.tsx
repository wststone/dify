"use client";
import type { FC } from "react";
import React from "react";
import { useTranslation } from "react-i18next";
import GroupName from "../../base/group-name";
import OpeningStatement, {
  type IOpeningStatementProps,
} from "./opening-statement";
import OpeningSuggestions, {
  type OpeningSuggestionsProps,
} from "./opening-suggestions";
import SuggestedQuestionsAfterAnswer from "./suggested-questions-after-answer";
import SpeechToText from "./speech-to-text";
import Citation from "./citation";

/*
 * Include
 * 1. Conversation Opener
 * 2. Opening Suggestion
 * 3. Next question suggestion
 */
type ChatGroupProps = {
  isShowOpeningStatement: boolean;
  isShowOpeningSuggestions: boolean;
  openingStatementConfig: IOpeningStatementProps;
  openingSuggestionsConfig: OpeningSuggestionsProps;
  isShowSuggestedQuestionsAfterAnswer: boolean;
  isShowSpeechText: boolean;
  isShowCitation: boolean;
};
const ChatGroup: FC<ChatGroupProps> = ({
  isShowOpeningStatement,
  isShowOpeningSuggestions,
  openingStatementConfig,
  openingSuggestionsConfig,
  isShowSuggestedQuestionsAfterAnswer,
  isShowSpeechText,
  isShowCitation,
}) => {
  const { t } = useTranslation();

  return (
    <div className="mt-7">
      <GroupName name={t("appDebug.feature.groupChat.title")} />
      <div className="space-y-3">
        {isShowOpeningStatement && (
          <OpeningStatement {...openingStatementConfig} />
        )}
        {isShowOpeningSuggestions && (
          <OpeningSuggestions {...openingSuggestionsConfig} />
        )}
        {isShowSuggestedQuestionsAfterAnswer && (
          <SuggestedQuestionsAfterAnswer />
        )}
        {isShowSpeechText && <SpeechToText />}
        {isShowCitation && <Citation />}
      </div>
    </div>
  );
};
export default React.memo(ChatGroup);
