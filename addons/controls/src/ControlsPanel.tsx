import React, { FC } from 'react';
import { ArgsTable, NoControlsWarning } from '@storybook/components';
import { useArgs, useArgTypes, useParameter } from '@storybook/api';

import { PARAM_KEY } from './constants';

interface ControlsParameters {
  expanded?: boolean;
  hideNoControlsWarning?: boolean;
}

export const ControlsPanel: FC = () => {
  const [args, updateArgs, resetArgs] = useArgs();
  const rows = useArgTypes();
  const isArgsStory = useParameter<boolean>('__isArgsStory', false);
  const { expanded, hideNoControlsWarning = false } = useParameter<ControlsParameters>(
    PARAM_KEY,
    {}
  );

  const hasControls = Object.values(rows).some((arg) => arg?.control);
  const showWarning = !(hasControls && isArgsStory) && !hideNoControlsWarning;

  return (
    <>
      {showWarning && <NoControlsWarning />}
      <ArgsTable
        {...{
          compact: !expanded && hasControls,
          rows,
          args,
          updateArgs,
          resetArgs,
          inAddonPanel: true,
        }}
      />
    </>
  );
};
