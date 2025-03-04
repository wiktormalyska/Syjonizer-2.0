import { version } from '../../package.json';
import { BlockComponent } from './components/BlockComponent.tsx';
import { FeatureComponent } from './components/FeatureComponent.tsx';
import { AutoHideSidebar } from '../functions/AutoHideSidebar.tsx';
import { useEffect, useState } from 'react';
import { InitCssInjection } from '../functions/InitCssInjection.tsx';

export const PopupComponent = () => {
  const [isHidden, setIsHidden] = useState<boolean>(true);

  useEffect(() => {
    chrome.storage.local.get('isHidden', (data) => {
      if (data.isHidden === "true") { /* empty */ } else {
        setIsHidden(false);
      }
    });
    InitCssInjection();
  }, []);

  const handleCheckboxChange = (value: boolean) => {
    chrome.storage.local.set({ isHidden: value ? 'true' : 'false' }, () => {
      setIsHidden(value);
    });
  };

  if (isHidden === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className={'w-64 h-max flex flex-col bg-neutral-100 items-center pt-5 pb-5'}>
      <div className={'text-3xl tracking-wider font-medium'}>Syjonizer 2.0</div>
      <div className={'text-xs opacity-50 flex flex-row justify-between w-full pl-9 pr-9'}>
        <div>by Wiktor Małyska</div>
        <div>{version}</div>
      </div>
      <div className={'mt-5 p-2 w-full'}>
        <BlockComponent title={'Funkcjonalności'}>
          <FeatureComponent
            name={'Automatyczne ukrywanie paska'}
            onChange={handleCheckboxChange}
            initValue={isHidden}
          />
          <AutoHideSidebar isHidden={isHidden} />
        </BlockComponent>
      </div>
    </div>
  );
};