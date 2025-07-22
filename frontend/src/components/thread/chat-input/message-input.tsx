import React, { forwardRef, useEffect, useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Square, Loader2, ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { UploadedFile } from './chat-input';
import { FileUploadHandler } from './file-upload-handler';
import { VoiceRecorder } from './voice-recorder';
import { ModelSelector } from './model-selector';
import { ChatSettingsDropdown } from './chat-settings-dropdown';
import { SubscriptionStatus } from './_use-model-selection';
import { isLocalMode } from '@/lib/config';
import { useFeatureFlag } from '@/lib/feature-flags';
import { TooltipContent } from '@/components/ui/tooltip';
import { Tooltip } from '@/components/ui/tooltip';
import { TooltipProvider, TooltipTrigger } from '@radix-ui/react-tooltip';
import { BillingModal } from '@/components/billing/billing-modal';

interface MessageInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onTranscription: (text: string) => void;
  placeholder: string;
  loading: boolean;
  disabled: boolean;
  isAgentRunning: boolean;
  onStopAgent?: () => void;
  isDraggingOver: boolean;
  uploadedFiles: UploadedFile[];

  fileInputRef: React.RefObject<HTMLInputElement>;
  isUploading: boolean;
  sandboxId?: string;
  setPendingFiles: React.Dispatch<React.SetStateAction<File[]>>;
  setUploadedFiles: React.Dispatch<React.SetStateAction<UploadedFile[]>>;
  setIsUploading: React.Dispatch<React.SetStateAction<boolean>>;
  hideAttachments?: boolean;
  messages?: any[]; // Add messages prop

  selectedModel: string;
  onModelChange: (model: string) => void;
  modelOptions: any[];
  subscriptionStatus: SubscriptionStatus;
  canAccessModel: (modelId: string) => boolean;
  refreshCustomModels?: () => void;
  selectedAgentId?: string;
  onAgentSelect?: (agentId: string | undefined) => void;
}

export const MessageInput = forwardRef<HTMLTextAreaElement, MessageInputProps>(
  (
    {
      value,
      onChange,
      onSubmit,
      onTranscription,
      placeholder,
      loading,
      disabled,
      isAgentRunning,
      onStopAgent,
      isDraggingOver,
      uploadedFiles,

      fileInputRef,
      isUploading,
      sandboxId,
      setPendingFiles,
      setUploadedFiles,
      setIsUploading,
      hideAttachments = true,
      messages = [],

      selectedModel,
      onModelChange,
      modelOptions,
      subscriptionStatus,
      canAccessModel,
      refreshCustomModels,

      selectedAgentId,
      onAgentSelect,
    },
    ref,
  ) => {
    const [billingModalOpen, setBillingModalOpen] = useState(false);
    const { enabled: customAgentsEnabled, loading: flagsLoading } = useFeatureFlag('custom_agents');

    useEffect(() => {
      const textarea = ref as React.RefObject<HTMLTextAreaElement>;
      if (!textarea.current) return;

      const adjustHeight = () => {
        textarea.current!.style.height = 'auto';
        const newHeight = Math.min(
          Math.max(textarea.current!.scrollHeight, 24),
          200,
        );
        textarea.current!.style.height = `${newHeight}px`;
      };

      adjustHeight();

      // Call it twice to ensure proper height calculation
      adjustHeight();

      window.addEventListener('resize', adjustHeight);
      return () => window.removeEventListener('resize', adjustHeight);
    }, [value, ref]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
        e.preventDefault();
        if (
          (value.trim() || uploadedFiles.length > 0) &&
          !loading &&
          (!disabled || isAgentRunning)
        ) {
          onSubmit(e as unknown as React.FormEvent);
        }
      }
    };

    // CSS class variables for better readability
    const textareaClasses = [
      'w-full bg-background/50 dark:bg-background/70',
      'border-2 border-primary/20 dark:border-primary/30',
      'shadow-md focus-visible:ring-2 focus-visible:ring-primary/50 dark:focus-visible:ring-primary/60',
      'focus-visible:border-primary/60 dark:focus-visible:border-primary/70',
      'px-4 py-3 text-base min-h-[48px] max-h-[200px]',
      'overflow-y-auto resize-none rounded-xl backdrop-blur-sm',
      'font-medium placeholder:text-muted-foreground/70',
      'transition-all duration-200 hover:border-primary/30 dark:hover:border-primary/40',
      isDraggingOver ? 'opacity-40 border-primary/40 dark:border-primary/50' : '',
    ].filter(Boolean).join(' ');

    const upgradeTextClasses = [
      'text-sm text-amber-500 dark:text-amber-400',
      'hidden sm:block cursor-pointer',
      'hover:text-amber-600 dark:hover:text-amber-300',
      'font-medium transition-colors'
    ].join(' ');

    const submitButtonClasses = [
      'w-9 h-9 flex-shrink-0 self-end',
      'bg-primary hover:bg-primary/90 dark:bg-primary dark:hover:bg-primary/90',
      'shadow-lg border-2 border-primary/20 dark:border-primary/30',
      'hover:border-primary/40 dark:hover:border-primary/50',
      'transition-all duration-200 rounded-xl',
      isAgentRunning ? 'bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 border-red-400 dark:border-red-500' : '',
      (!value.trim() && uploadedFiles.length === 0 && !isAgentRunning) ||
        loading ||
        (disabled && !isAgentRunning)
        ? 'opacity-50 cursor-not-allowed'
        : 'hover:scale-105 active:scale-95',
    ].filter(Boolean).join(' ');

    const mobileUpgradeClasses = [
      'text-xs text-amber-500 dark:text-amber-400',
      'px-3 py-1.5 bg-amber-50 dark:bg-amber-900/20',
      'rounded-full border border-amber-200 dark:border-amber-800',
      'font-medium'
    ].join(' ');

    return (
      <div className="relative flex flex-col w-full h-auto gap-4 justify-between">

        <div className="flex flex-col gap-2 items-center px-2">
          <Textarea
            ref={ref}
            value={value}
            onChange={onChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className={textareaClasses}
            disabled={loading || (disabled && !isAgentRunning)}
            rows={2}
          />
        </div>

        <div className="flex items-center justify-between mt-1 ml-3 mb-1 pr-2">
          <div className="flex items-center gap-3">
            {!hideAttachments && (
              <FileUploadHandler
                ref={fileInputRef}
                loading={loading}
                disabled={disabled}
                isAgentRunning={isAgentRunning}
                isUploading={isUploading}
                sandboxId={sandboxId}
                setPendingFiles={setPendingFiles}
                setUploadedFiles={setUploadedFiles}
                setIsUploading={setIsUploading}
                messages={messages}
              />
            )}

          </div>

          {subscriptionStatus === 'no_subscription' && !isLocalMode() &&
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <p role='button' className={upgradeTextClasses} onClick={() => setBillingModalOpen(true)}>Upgrade for full performance</p>
                </TooltipTrigger>
                <TooltipContent>
                  <p>The free tier is severely limited by inferior models; upgrade to experience the true full Pulsar Agents experience.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          }

          <div className='flex items-center gap-3'>
            {/* Show model selector inline if custom agents are disabled, otherwise show settings dropdown */}
            {!customAgentsEnabled || flagsLoading ? (
              <ModelSelector
                selectedModel={selectedModel}
                onModelChange={onModelChange}
                modelOptions={modelOptions}
                subscriptionStatus={subscriptionStatus}
                canAccessModel={canAccessModel}
                refreshCustomModels={refreshCustomModels}
                billingModalOpen={billingModalOpen}
                setBillingModalOpen={setBillingModalOpen}
              />
            ) : (
              <ChatSettingsDropdown
                selectedAgentId={selectedAgentId}
                onAgentSelect={onAgentSelect}
                selectedModel={selectedModel}
                onModelChange={onModelChange}
                modelOptions={modelOptions}
                subscriptionStatus={subscriptionStatus}
                canAccessModel={canAccessModel}
                refreshCustomModels={refreshCustomModels}
                disabled={loading || (disabled && !isAgentRunning)}
              />
            )}

            {/* Billing Modal */}
            <BillingModal
              open={billingModalOpen}
              onOpenChange={setBillingModalOpen}
              returnUrl={typeof window !== 'undefined' ? window.location.href : '/'}
            />

            {/*<VoiceRecorder*/}
            {/*  onTranscription={onTranscription}*/}
            {/*  disabled={loading || (disabled && !isAgentRunning)}*/}
            {/*/>*/}

            <Button
              type="submit"
              onClick={isAgentRunning && onStopAgent ? onStopAgent : onSubmit}
              size="sm"
              className={submitButtonClasses}
              disabled={
                (!value.trim() && uploadedFiles.length === 0 && !isAgentRunning) ||
                loading ||
                (disabled && !isAgentRunning)
              }
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : isAgentRunning ? (
                <Square className="h-4 w-4" />
              ) : (
                <ArrowUp className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
        {subscriptionStatus === 'no_subscription' && !isLocalMode() &&
          <div className='sm:hidden absolute -bottom-8 left-0 right-0 flex justify-center'>
            <p className='text-xs text-amber-500 dark:text-amber-400 px-3 py-1.5 bg-amber-50 dark:bg-amber-900/20 rounded-full border border-amber-200 dark:border-amber-800 font-medium'>
              Upgrade for better performance
            </p>
          </div>
        }
      </div>
    );
  },
);

MessageInput.displayName = 'MessageInput';