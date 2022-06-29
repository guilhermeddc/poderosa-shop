import React, {useCallback, useState} from 'react';

import {Tabs, Tab, Divider, Grid, Stack, Typography} from '@mui/material';
import {Head} from 'shared/infra/components/Head';
import {TabPanel} from 'shared/components';
import {Box} from '@mui/system';
import {useQuery} from 'react-query';
import {useAuth} from 'shared/hooks';
import axios from 'axios';
import {orderService} from 'shared/services/api/order';

const Profile: React.FC = () => {
  const [value, setValue] = useState(0);

  const {user} = useAuth();

  const {data: orders} = useQuery(
    `orders/${user?.id}`,
    () => orderService.getOrdersByUserId(String(user?.id)),
    {
      refetchOnReconnect: false,
    },
  );

  const handleChange = useCallback(
    (_: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
    },
    [],
  );

  const handleA11yProps = useCallback((index: number) => {
    return {
      id: `vertical-tab-${index}`,
      'aria-controls': `vertical-tabpanel-${index}`,
    };
  }, []);

  return (
    <>
      <Head title="Meu Perfil - A Poderosa SM" />

      <Grid container spacing={3} p={3}>
        <Grid item xs={12}>
          <Typography variant="h4" align="center" fontSize={{md: 72, xs: 24}}>
            Meu Perfil
          </Typography>

          <Divider />
        </Grid>
        <Grid item xs={12}>
          <Box
            sx={{
              flexGrow: 1,
              display: 'flex',
              height: 224,
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Tabs orientation="vertical" value={value} onChange={handleChange}>
              <Tab
                label="Meus dados"
                sx={{minWidth: 300}}
                {...handleA11yProps(0)}
              />
              <Tab label="Endereço" {...handleA11yProps(1)} />
              <Tab label="Pedidos" {...handleA11yProps(2)} />
            </Tabs>

            <TabPanel value={value} index={0}>
              Dados
            </TabPanel>
            <TabPanel value={value} index={1}>
              Endereço
            </TabPanel>
            <TabPanel value={value} index={2}>
              {orders?.map((order) => (
                <Stack key={order.id} mb={2}>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center">
                    <Typography variant="h6">Pedido</Typography>
                    <Typography variant="body1">{order.id}</Typography>
                  </Stack>
                  <Divider />
                </Stack>
              ))}
            </TabPanel>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Profile;
