import 'styles/globals.css';
import React, {useState} from 'react';
import Head from 'next/head';
import {AppProps} from 'next/app';
import {ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {CacheProvider, EmotionCache} from '@emotion/react';
import createEmotionCache from 'shared/infra/helpers/createEmotionCache';
import theme from 'styles/theme';
import {Layout} from 'styles/layout';
import {QueryClient, QueryClientProvider} from 'react-query';
import {ReactQueryDevtools} from 'react-query/devtools';
import {AppProvider} from 'shared/context';
import {useRouter} from 'next/router';
import {ProtectedRoute} from 'shared/components';

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const {Component, emotionCache = clientSideEmotionCache, pageProps} = props;
  const [queryClient] = useState(() => new QueryClient());

  const router = useRouter();

  const noAuthRequired = [
    '/',
    '/about',
    '/login',
    '/register',
    '/collection',
    '/product/:id',
  ];

  return (
    <QueryClientProvider client={queryClient}>
      <CacheProvider value={emotionCache}>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <ThemeProvider theme={theme}>
          <AppProvider>
            <CssBaseline />
            <Layout>
              {/* {noAuthRequired.includes(router.pathname) ? (
                <Component {...pageProps} />
              ) : (
                <ProtectedRoute> */}
              <Component {...pageProps} />
              {/* </ProtectedRoute>
              )} */}
              <ReactQueryDevtools initialIsOpen={false} />
            </Layout>
          </AppProvider>
        </ThemeProvider>
      </CacheProvider>
    </QueryClientProvider>
  );
}
