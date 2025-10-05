export const ErrorFallback = ({
  message = 'Ой, что-то пошло не так',
}: {
  message?: string;
}) => (
  <div className="flex flex-col items-center justify-center p-6 bg-gray-50 border border-gray-200 rounded-lg text-center">
    <div className="text-4xl mb-3">😵</div>
    <h3 className="text-lg font-medium text-gray-900 mb-2">{message}</h3>
    <p className="text-gray-600 text-sm mb-4">
      Попробуйте перезагрузить страницу
    </p>
    <button
      onClick={() => window.location.reload()}
      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm"
    >
      Перезагрузить
    </button>
  </div>
);
