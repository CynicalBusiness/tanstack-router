import { expectTypeOf, test } from 'vitest'
import {
  createRootRoute,
  createRoute,
  createRouter,
  useRouterState,
} from '../src'
import type { RouterState } from '../src'

const rootRoute = createRootRoute({
  validateSearch: () => ({
    page: 0,
  }),
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
})

const invoicesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'invoices',
})

const invoicesIndexRoute = createRoute({
  getParentRoute: () => invoicesRoute,
  path: '/',
})

const invoiceRoute = createRoute({
  getParentRoute: () => invoicesRoute,
  path: '$invoiceId',
  validateSearch: () => ({ page: 0 }),
})

const routeTree = rootRoute.addChildren([
  invoicesRoute.addChildren([invoicesIndexRoute, invoiceRoute]),
  indexRoute,
])

const defaultRouter = createRouter({
  routeTree,
})

type DefaultRouter = typeof defaultRouter

test('can select router state', () => {
  expectTypeOf(useRouterState<DefaultRouter>)
    .returns.returns.toHaveProperty('location')
    .toMatchTypeOf<{
      search: { page?: number | undefined }
    }>()

  expectTypeOf(useRouterState<DefaultRouter, { func: () => void }>)
    .parameter(0)
    .exclude<undefined>()
    .toHaveProperty('select')
    .toEqualTypeOf<
      | ((search: RouterState<DefaultRouter['routeTree']>) => {
          func: () => void
        })
      | undefined
    >()
})
