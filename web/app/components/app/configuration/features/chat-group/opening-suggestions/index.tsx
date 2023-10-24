"use client";
import { memo, useState } from "react";
import { useTranslation } from "react-i18next";
import produce from "immer";
import { useContext } from "use-context-selector";
import { LightBulbIcon, XMarkIcon } from "@heroicons/react/24/solid";
import ConfigContext from "@/context/debug-configuration";
import Panel from "@/app/components/app/configuration/base/feature-panel";
import Button from "@/app/components/base/button";

export type OpeningSuggestionsProps = {
  value?: string[];
  onChange: (suggestions: string[]) => void;
};

const OpeningSuggestions = ({
  value = [],
  onChange,
}: OpeningSuggestionsProps) => {
  const { t } = useTranslation();
  const { modelConfig, setModelConfig } = useContext(ConfigContext);
  const [suggestion, setSuggestion] = useState<string>("");
  const [tempSuggestions, setTempSuggestions] = useState(value);
  const openingSuggestions = modelConfig.opening_suggestions;

  const addSuggestion = () => {
    const suggestions = [...tempSuggestions, suggestion];
    setTempSuggestions(suggestions);
    onChange?.(suggestions);
    setSuggestion("");

    const newModelConfig = produce(modelConfig, (draft) => {
      draft.opening_suggestions.push(suggestion);
    });
    setModelConfig(newModelConfig);
  };

  const deleteSuggestion = (suggestion: string) => {
    const suggestions = tempSuggestions.filter((s) => s !== suggestion);
    setTempSuggestions(suggestions);
    onChange?.(suggestions);
    const newModelConfig = produce(modelConfig, (draft) => {
      draft.opening_suggestions = draft.opening_suggestions.filter(
        (s) => s !== suggestion
      );
    });
    setModelConfig(newModelConfig);
  };

  return (
    <Panel
      // className={cn(isShowConfirmAddVar && "h-[220px]", "relative mt-4")}
      title={t("appDebug.feature.openingSuggestions.title")}
      headerIcon={<LightBulbIcon width="16" height="16" fill="#FF7A32" />}
      // headerRight={<OperationBtn type="add" onClick={addSuggestion} />}
      // hasHeaderBottomBorder={!hasValue}
      // isFocus={isFocus}
    >
      {openingSuggestions && openingSuggestions.length > 0 && (
        <div className="flex flex-wrap gap-3">
          {openingSuggestions.map((suggestion) => (
            <span
              key={suggestion}
              className="inline-flex gap-1 text-sm px-1.5 py-0.5 rounded-md items-center text-blue-400 bg-blue-100 border border-blue-50"
            >
              {suggestion}
              <button
                className="w-4 h-4 p-0.5 hover:bg-blue-200 rounded-full"
                type="button"
                onClick={() => deleteSuggestion(suggestion)}
              >
                <XMarkIcon />
              </button>
            </span>
          ))}
        </div>
      )}
      <div className="relative mt-2">
        <input
          value={suggestion}
          disabled={false}
          onChange={(e) => setSuggestion(e.target.value)}
          className={
            "w-full rounded-lg h-10 box-border pl-3 text-sm leading-10 bg-gray-100 pr-12 focus:outline-none"
          }
        />
        <Button
          disabled={!suggestion || openingSuggestions?.includes(suggestion)}
          className="absolute text-sm right-0 top-1/2 -translate-y-1/2"
          onClick={addSuggestion}
          type="primary"
        >
          {t("common.operation.add")}
        </Button>
      </div>
    </Panel>
  );
};

export default memo(OpeningSuggestions);
