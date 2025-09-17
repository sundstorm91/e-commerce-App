import { ProductCard } from '@/components/product-card/ProductCard';
import { Spinner } from '@/components/spinner/spinner';
import { useProductStore } from '@/service/store/product.store';
import { useEffect } from 'react';

export const MainPage: React.FC = () => {
  const { products, error, isLoading, fetchProducts } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  if (isLoading) return <Spinner />;
  if (error) return <div>Ошибка: {error}</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
      {products.map((product) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </div>
  );
};
