import { PlusSmIcon } from '@heroicons/react/solid';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { ErrorFeedback, SvgIcon } from 'src/common';
import { useAppDispatch, useAppSelector } from 'src/store';

import {
  fetchCategories,
  getCategories,
  getError,
  getIsLoading
} from './categorySlice';

export const Category = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(getCategories);
  const error = useAppSelector(getError);
  const isLoading = useAppSelector(getIsLoading);
  const navigate = useNavigate();
  const { categoryId } = useParams();

  useEffect(() => {
    const promise = dispatch(fetchCategories({ categoryId: categoryId }));
    return () => promise.abort();
  }, [dispatch, categoryId]);

  return (
    <div>
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Categories</h1>
        </div>
      </header>
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {!isLoading && !error && (
          <ul
            role="list"
            className="mt-3 grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            <li className="group">
              <div className="h-14 col-span-1 flex shadow-sm rounded-md cursor-pointer group-hover:shadow-lg">
                <div className="bg-gray-200 flex-shrink-0 flex items-center justify-center w-16 text-white text-sm font-medium rounded-l-md">
                  <PlusSmIcon className="w-12 h-12" aria-hidden="true" />
                </div>
                <div className="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate">
                  <div className="flex-1 px-4 py-2 text-sm truncate">
                    <p className="text-gray-900 font-medium group-hover:text-gray-600">
                      New category
                    </p>
                  </div>
                </div>
              </div>
            </li>
            {categories.map((category) => (
              <li
                key={category.id}
                className="group"
                onClick={(): void => navigate(`/app/categories/${category.id}`)}
              >
                <div className="h-14 col-span-1 flex shadow-sm rounded-md cursor-pointer group-hover:shadow-lg">
                  <div className="bg-gray-200 flex-shrink-0 flex items-center justify-center w-16 text-white text-sm font-medium rounded-l-md">
                    <SvgIcon className="w-6 h-6" svgString={category.icon} />
                  </div>
                  <div className="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate">
                    <div className="flex-1 px-4 py-2 text-sm truncate">
                      <p className="text-gray-900 font-medium group-hover:text-gray-600">
                        {category.name}
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
        {isLoading && <div>Loading ...</div>}
        {error && <ErrorFeedback error={error} />}
      </div>
    </div>
  );
};
