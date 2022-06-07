import { XCircleIcon } from '@heroicons/react/solid';

import { SerializedAppError } from 'src/models';

type ErrorFeedbackProps = {
  error: SerializedAppError;
};

export const ErrorFeedback = ({ error }: ErrorFeedbackProps): JSX.Element => (
  <div className="rounded-md bg-red-50 p-4">
    <div className="flex">
      <div className="flex-shrink-0">
        <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
      </div>
      <div className="ml-3">
        <h3 className="text-sm font-medium text-red-800">{error.name}</h3>
        <div className="mt-2 text-sm text-yellow-700">
          <p>{error.message}</p>
        </div>
      </div>
    </div>
  </div>
);
