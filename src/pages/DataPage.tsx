import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch } from '../app/store'
import Panel from '../components/ui/Panel'
import ListSkeleton from '../components/ui/ListSkeleton'
import ErrorMessage from '../components/ui/ErrorMessage'
import EmptyList from '../components/ui/EmptyList'
import ProductRow from '../features/products/components/ProductRow'
import UserRow from '../features/users/components/UserRow'
import {
  fetchProductsData,
  getAllProducts,
  getProductError,
  getProductLoadingState,
} from '../features/products/productsSlice'
import useFetch, { type User } from '../hooks/useFetch'

function DataPage() {
  const dispatch = useDispatch<AppDispatch>()
  const products = useSelector(getAllProducts)
  const productsLoading = useSelector(getProductLoadingState)
  const productsError = useSelector(getProductError)

  const {
    data: users = [],
    loading: usersLoading,
    error: usersError,
    refetch: refetchUsers,
  } = useFetch<User[]>('https://fakestoreapi.com/users')

  useEffect(() => {
    dispatch(fetchProductsData())
  }, [dispatch])

  const handleRetryProducts = () => {
    dispatch(fetchProductsData())
  }
  return (
    <div className="grid gap-4 border-t border-gray-200 p-4 sm:p-6 lg:grid-cols-2">
      <Panel
        title="Products"
        source="Redux Toolkit · createAsyncThunk"
        role="region"
        ariaLabel="Extra Data Panel 1"
        count={products.length}
      >
        {productsLoading && <ListSkeleton />}
        {productsError && !productsLoading && (
          <ErrorMessage message={productsError} onRetry={handleRetryProducts} />
        )}
        {!productsLoading && !productsError && products.length === 0 && (
          <EmptyList message="No products found" />
        )}
        {!productsLoading && !productsError && products.length > 0 && (
          <div className="divide-y divide-gray-100">
            {products.map((p) => (
              <ProductRow
                key={p.id}
                id={p.id}
                title={p.title}
                category={p.category}
                price={p.price}
                image={p.image}
              />
            ))}
          </div>
        )}
      </Panel>
      <Panel
        title="Users"
        source="useFetch<User[]>"
        role="region"
        ariaLabel="Extra Data Panel 2"
        count={users ? users.length : 0}
      >
        {usersLoading && <ListSkeleton />}
        {usersError && !usersLoading && (
          <ErrorMessage message={usersError} onRetry={refetchUsers} />
        )}
        {!usersLoading && !usersError && (!users || users.length === 0) && (
          <EmptyList message="No users found" />
        )}
        {!usersLoading && !usersError && users && users.length > 0 && (
          <div className="divide-y divide-gray-100">
            {users.map((u) => (
              <UserRow key={u.id} user={u} />
            ))}
          </div>
        )}
      </Panel>
    </div>
  )
}

export default DataPage
