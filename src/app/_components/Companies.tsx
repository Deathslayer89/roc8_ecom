
"use client";

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { set } from 'zod';
import { api } from '~/trpc/react';
import LoadingComponent from './LoadingComponent';
const CategoryList = ({ userEmail }: { userEmail: string }) => {
  const { data: userId, isLoading: isLoadingUserId } = api.category.getUserIdByEmail.useQuery({ email: userEmail });
  const resolvedUserId = userId ?? 0;
  const [page, setPage] = useState(0);
  const { data: categories, isLoading } = api.category.category.useQuery({
    skip: page * 6,
    take: 6,
  }, {
    enabled: !!resolvedUserId,
  });

  const { data: userCategories, refetch: refetchUserCategories } = api.category.userCategories.useQuery({
    userid: resolvedUserId || 0,
  }, {
    enabled: !!resolvedUserId,
  })

  console.log(resolvedUserId);
  console.log(userCategories)

  const [currCategoryIds, setCurrCategoryIds] = useState(new Set());


  const router = useRouter();
  const toggleCategory = api.category.toggleCategory.useMutation({
    onSuccess: async () => {
      await refetchUserCategories(); // Refetch userCategories after successful mutation
      updateCurrCategoryIds(); // Update currCategoryIds
    }
  });


  const totalPages = Math.floor(100 / 6);
  const pageRange = Array.from({ length: 5 }, (_, i) => i + Math.max(0, page - 2));

  const handleCategoryToggle = async (categoryId: number) => {
    await toggleCategory.mutateAsync({ userId: resolvedUserId, categoryId });
  };

  const handlePageChange = (newPage: number) => {
    console.log('clicked', page);
    if (newPage >= 0 && newPage < totalPages) {
      setPage(newPage);
    }
    console.log(page);
  };

  function deleteCookie() {
    document.cookie = `${'currUser'}=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/;`;
  }
  const updateCurrCategoryIds = () => {
    const newCurrCategoryIds = new Set(userCategories?.map(userCategory => userCategory.categoryId));
    setCurrCategoryIds(newCurrCategoryIds);
  }

  useEffect(() => {
    updateCurrCategoryIds();
  }, [userCategories]);


  const handleLogout = () => {
    console.log('Logout clicked');
    deleteCookie()
    router.push('/')
  };

  if (isLoading) {
    return <LoadingComponent />
  }


  return (
    <div className="max-w-md mx-auto p-4 border border-gray-300 rounded-md relative">
      <button
        className="absolute top-2 right-2 bg-black text-white px-3 py-1 rounded-md"
        onClick={handleLogout}
      >
        Logout
      </button>
      <h2 className="text-lg font-semibold mb-2">Please mark your interests!</h2>
      <p className="text-sm text-gray-500 mb-4">We will keep you notified.</p>
      <h3 className="text-md font-semibold mb-2">My saved interests!</h3>
      <ul className="space-y-2">
        {categories?.map((category) => (
          <li key={category.id} className="flex items-center">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="form-checkbox mr-2"
                // checked={userCategories?.some(
                //   (userCategory) => userCategory.categoryId === category.id
                // )}
                checked={currCategoryIds?.has(category.id)}
                onChange={() => handleCategoryToggle(category.id)}
              />
              {category.name}
            </label>
          </li>
        ))}
      </ul>
      <div className="flex justify-center mt-4">
        <button
          disabled={page === 0}
          onClick={() => handlePageChange(page - 1)}
          className="bg-gray-200 text-gray-700 px-3 py-1 rounded-md mr-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        {pageRange.map((pageNumber) => (
          <button
            key={pageNumber}
            disabled={pageNumber === page}
            onClick={() => handlePageChange(pageNumber)}
            className={`bg-gray-200 text-gray-700 px-3 py-1 rounded-md mx-1 ${pageNumber === page
              ? 'bg-green-500 text-white'
              : 'hover:bg-gray-300'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {pageNumber + 1}
          </button>
        ))}
        <button
          disabled={page === totalPages - 1}
          onClick={() => handlePageChange(page + 1)}
          className="bg-gray-200 text-gray-700 px-3 py-1 rounded-md ml-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CategoryList;