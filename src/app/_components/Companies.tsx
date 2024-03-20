"use client";
import { useEffect, useState } from 'react';
import { api } from '~/trpc/react';
const CategoryList = () => {
  const [page, setPage] = useState(0);
  const { data: categories, isLoading } = api.category.category.useQuery(
    {
      skip: page * 6,
      take: 6,
    }
  );

  // useEffect(() => {
  //   const update = async () => {
  //     const updated = api.category.category.useQuery({
  //       skip: page * 6,
  //       take: 6,
  //     })
  //     console.log(updated.data);
  //   }
  //   update().catch(e => {
  //     console.log(e)
  //   })
  // }, [page])

  const toggleCategory = api.category.toggleCategory.useMutation();


  const totalPages = Math.floor(100/6);
  const pageRange = Array.from({ length: 5 }, (_, i) => i + Math.max(0, page - 2));

  const handleCategoryToggle = async (categoryId: number) => {
    const userId = 1; // Replace with the actual user ID
    await toggleCategory.mutateAsync({ userId, categoryId });
  };

  const handlePageChange = (newPage: number) => {
    console.log('clicked', page)
    if (newPage >= 0 && newPage < totalPages) {

      setPage(newPage)
    }
    console.log(page)
  };


  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <ul>
        {categories?.map((category) => (
          <li key={category.id}>
            <label>
              <input
                type="checkbox"
                // checked={/* Check if the category is selected for the current user */}
                onChange={() => handleCategoryToggle(category.id)}
              />
              {category.name}
            </label>
          </li>
        ))}
      </ul>
      <div>
        <button disabled={page === 0} onClick={() => handlePageChange(page - 1)}>
          Previous
        </button>
        {pageRange.map((pageNumber) => (
          <button
            key={pageNumber}
            disabled={pageNumber === page}
            onClick={() => handlePageChange(pageNumber)}
          >
            {pageNumber + 1}
          </button>
        ))}
        <button
          disabled={page === totalPages - 1}
          onClick={() => handlePageChange(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CategoryList;