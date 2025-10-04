import { ProductCard } from '@/components/product-card/ProductCard';
import { Spinner } from '@/components/spinner/spinner';
import { useQuery } from '@tanstack/react-query';
import { ProductsService } from '@/service/api/products';
import { useSearchParams } from 'react-router-dom';
import { useMemo } from 'react';

export const MainPage: React.FC = () => {
  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['products'],
    queryFn: () => ProductsService.getAll(),
  });

  if (isLoading) return <Spinner />;
  if (error) return <div>Ошибка: {error.message}</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
      {products?.map((product) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </div>
  );
};
