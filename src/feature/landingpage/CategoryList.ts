import { getCategories } from '@/api/categoryApi';
import {CategoryResponse} from '@/api/type/Category';

const CategoryList = () => {
  const [categories, setCategories] = useState<CategoryResponse[]>([]); 

  const handleLoad = useCallback(async () => {
    try {
      const response: CategoryResponse[] | null = await getCategories();
      if (response) {
        setCategories(response);
      } else {
        setCategories([]);
      }