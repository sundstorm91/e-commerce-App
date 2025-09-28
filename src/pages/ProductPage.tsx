// pages/ProductPage.tsx
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  Star,
  Heart,
  ArrowLeft,
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useProductStore } from '../service/store/product.store';
import { useCartStore } from '@/service/store/cart.store';
/* import { useCartStore } from '@/store/useCartStore';  */

export const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { products } = useProductStore();
  const { addItem } = useCartStore();

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // Находим продукт по ID из параметров URL
  const product = products.find((p) => p.id === Number(id));

  // Если продукт не найден в сторе, возможно, нужно загрузить его отдельно
  useEffect(() => {
    if (!product && id) {
      // Здесь можно добавить логику для загрузки одного продукта
      // например, ProductsService.getById(Number(id))
      console.log('Product not found in store, need to fetch individually');
    }
  }, [product, id]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Товар не найден
          </h2>
          <Link
            to="/"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Вернуться на главную
          </Link>
        </div>
      </div>
    );
  }

  const fullStars = Math.floor(product.rating?.rate || 0);
  const hasHalfStar = (product.rating?.rate || 0) % 1 >= 0.5;

  const images = [product.image, product.image, product.image]; // Заглушка

  const handleAddtoCart = () => {
    addItem(
      {
        id: product.id,
        title: product.title,
        image: product.image,
        category: product.category,
        price: product.price,
        description: product.description,
      },
      quantity
    );
  };

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Хлебные крошки и кнопка назад */}
        <nav className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Назад
          </button>
          <div className="text-sm text-gray-500">
            <Link to="/" className="hover:text-gray-900">
              Главная
            </Link>
            <span className="mx-2">/</span>

            <Link
              to={`/category/${product.category}`}
              className="hover:text-gray-900 capitalize"
            >
              {product.category}
            </Link>
            <span className="mx-2">/</span>

            <span className="text-gray-900 line-clamp-1">{product.title}</span>
          </div>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white rounded-xl shadow-sm p-6">
          {/* Галерея изображений */}
          <div className="relative">
            <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
              <img
                src={images[selectedImageIndex]}
                alt={product.title}
                className="w-full h-full object-contain transition-transform duration-300"
              />

              {/* Навигация по изображениям */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md hover:bg-white transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md hover:bg-white transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* Кнопка избранного */}
              <button className="absolute top-2 right-2 bg-white/80 rounded-full p-2 shadow-md hover:bg-white transition-colors">
                <Heart className="w-5 h-5 text-gray-600 hover:text-rose-500" />
              </button>
            </div>

            {/* Миниатюры */}
            {images.length > 1 && (
              <div className="mt-4 flex gap-2">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`w-16 h-16 rounded border-2 overflow-hidden transition-all ${
                      selectedImageIndex === index
                        ? 'border-blue-500 ring-2 ring-blue-200'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Информация о товаре */}
          <div className="space-y-6">
            <div>
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full mb-3 capitalize">
                {product.category}
              </span>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                {product.title}
              </h1>

              {/* Рейтинг и отзывы */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 fill-current ${
                        i < fullStars
                          ? 'text-amber-400'
                          : hasHalfStar && i === fullStars
                            ? 'text-amber-400'
                            : 'text-gray-300'
                      }`}
                      strokeWidth={0}
                    />
                  ))}
                </div>
                <span className="text-lg text-gray-600">
                  {product.rating?.rate} ({product.rating?.count} отзывов)
                </span>
              </div>

              {/* Цена */}
              <div className="text-3xl font-bold text-gray-900 mb-6">
                {product.price} ₽
              </div>
            </div>

            {/* Описание */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Описание
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Выбор количества и добавление в корзину */}
            <div className="border-t pt-6">
              <div className="flex items-center gap-4 mb-6">
                <label className="text-lg font-medium text-gray-900">
                  Количество:
                </label>
                <div className="flex items-center border rounded-lg">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 text-lg font-medium w-12 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddtoCart}
                className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-3"
              >
                <ShoppingCart className="w-6 h-6" />
                Добавить в корзину
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
