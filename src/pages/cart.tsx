import {RemoveRounded, AddRounded} from '@mui/icons-material';
import {
  Avatar,
  Button,
  ButtonGroup,
  Grid,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import {useRouter} from 'next/router';
import {NextPage} from 'next/types';
import {useCallback, useEffect, useState} from 'react';
import {useAuth, useBackground, useCart} from 'shared/hooks';
import {Head} from 'shared/infra/components/Head';
import {feedback} from 'shared/services/alertService';
import {orderService} from 'shared/services/api/order';
import {moneyMask} from 'shared/utils/masks';

const Cart: NextPage = () => {
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const {setLayoutColors, setActiveZoom, setLeftClick, setRightClick} =
    useBackground();
  const {
    products,
    addProduct,
    removeProduct,
    deleteProduct,
    cartTotalPrice,
    clearCart,
  } = useCart();
  const {user} = useAuth();

  useEffect(() => {
    setLayoutColors({
      navItem: 'white',
      bgLogo: 'white',
      logo: '#23222a',
      bgLeft: '#23222a',
      bgRight: '#23222a',
    });
    setActiveZoom(true);
    setRightClick(
      (state) =>
        (state = {
          ...state,
          active: false,
        }),
    );
    setLeftClick(
      (state) =>
        (state = {
          ...state,
          active: false,
        }),
    );
  }, []);

  const handleCreateOrder = useCallback(async () => {
    setLoading(true);
    try {
      if (user?.id) {
        const response = await orderService.createOrder({
          userId: user.id,
          products,
          value: cartTotalPrice,
        });

        if (response.success) {
          feedback('Pedido criado com sucesso!', 'success');
          router.push('/');
          clearCart();
        }
      } else {
        router.push('/login');
      }
    } catch (error: any) {
      feedback(String(error.message), 'error');
    } finally {
      setLoading(false);
    }
  }, [user, products, clearCart, router]);

  return (
    <>
      <Head title="Sacola - A Poderosa SM" />

      <Grid container p={4} spacing={4}>
        <Grid item xs={12} mb={4}>
          <Typography variant="h2">Sacola</Typography>
        </Grid>

        {products.length > 0 ? (
          <Grid item xs={12}>
            <TableContainer sx={{width: {xs: '80vw', md: '100%'}}}>
              <Table sx={{minWidth: 650, overflowX: 'scroll'}}>
                <TableHead>
                  <TableRow>
                    <TableCell>Produto</TableCell>
                    <TableCell>Quantidade</TableCell>
                    <TableCell></TableCell>
                    <TableCell align="right">Valor</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {products.map((p) => (
                    <TableRow key={p.product.id}>
                      <TableCell>
                        <Stack direction="row" alignItems="center" spacing={3}>
                          <Avatar sx={{borderRadius: 1}}>
                            <img
                              src={p.product.image}
                              alt={p.product.title}
                              width="100%"
                            />
                          </Avatar>
                          <Typography variant="body1">
                            {p.product.title.slice(0, 50)}
                          </Typography>
                        </Stack>
                      </TableCell>

                      <TableCell>
                        <Stack direction="row" alignItems="center" spacing={3}>
                          <ButtonGroup
                            size="small"
                            aria-label="small button group">
                            <Button
                              data-testid={`remove-product-${p.product.id}`}
                              onClick={() => removeProduct(p.product.id)}
                              disabled={p.quantity === 1 || loading}>
                              <RemoveRounded />
                            </Button>

                            <Button>{p.quantity}</Button>

                            <Button
                              data-testid={`add-product-${p.product.id}`}
                              disabled={loading}
                              onClick={() => addProduct(p.product.id)}>
                              <AddRounded />
                            </Button>
                          </ButtonGroup>
                        </Stack>
                      </TableCell>

                      <TableCell>
                        <Button
                          data-testid={`delete-product-${p.product.id}`}
                          disabled={loading}
                          onClick={() => deleteProduct(p.product.id)}>
                          Excluir
                        </Button>
                      </TableCell>

                      <TableCell align="right">
                        <Typography variant="body1">
                          {moneyMask(p.value * p.quantity)}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell />
                    <TableCell />
                    <TableCell>
                      <Button disabled>Subtotal</Button>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body1">
                        {moneyMask(cartTotalPrice)}
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        ) : (
          <Grid item xs={12}>
            <Stack
              component={Paper}
              variant="outlined"
              height={200}
              width="100%"
              justifyContent="center"
              alignItems="center">
              <Typography variant="body1">
                Não há produtos na sacola.
              </Typography>
            </Stack>
          </Grid>
        )}

        <Grid item xs={12}>
          <Stack spacing={3} direction="row" justifyContent="flex-end">
            <Button
              variant="contained"
              disabled={loading}
              color="secondary"
              sx={{width: 250}}
              onClick={() => router.push('/')}>
              Continuar Comprando
            </Button>

            <Button
              variant="contained"
              disabled={products.length === 0 || loading}
              onClick={handleCreateOrder}
              color="primary"
              sx={{width: 250}}>
              {user ? 'Finalizar Compra' : 'Faça o login para continuar'}
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

export default Cart;
