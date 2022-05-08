import {NextPage} from 'next/types';
import {useEffect} from 'react';
import {useBackground} from 'shared/hooks';
import {Head} from 'shared/infra/components/Head';

const Shop: NextPage = () => {
  const {setLayoutColors, setRightClick, setLeftClick} = useBackground();

  useEffect(() => {
    setLayoutColors({
      bgLogo: 'white',
      logo: '#23222a',
      navItem: 'white',
      bgLeft: '#23222a',
      bgRight: '#ad8e9e',
    });
    setRightClick(
      (state) =>
        (state = {
          ...state,
          active: true,
        }),
    );
    setLeftClick(
      (state) =>
        (state = {
          ...state,
          active: true,
        }),
    );
  }, []);

  return (
    <>
      <Head title="Loja - A Poderosa SM" />
    </>
  );
};

export default Shop;
