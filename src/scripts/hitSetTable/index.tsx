import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { Store } from 'webext-redux';

import { getReactEl } from '../../utils/getReactEl';
import { getReactProps, ReactPropsHitSetTable } from '../../utils/getReactProps';


const store = new Store();

store.ready().then(async () => {
  const el = await getReactEl('HitSetTable');
  const props: ReactPropsHitSetTable = await getReactProps('HitSetTable');

  el.querySelectorAll('.table-row').forEach((row, i) => {
    const hit = props.bodyData[i];

    row.querySelectorAll('.requester-column .expand-button').forEach((button: HTMLElement) => {
      const react = document.createElement('span');

      button.style.display = 'none';
      button.parentElement.insertAdjacentElement('afterend', react);

      ReactDom.render(
        // @ts-ignore
        <Provider store={store}>
          <ReqScripts requester_id={hit.requester_id} requester_name={hit.requester_name} />
        </Provider>,
        react,
      );
    });

    row.querySelectorAll('.project-name-column, .p-r-sm.requester-column > span').forEach((element: HTMLElement) => {
      const react = document.createElement('span');
      element.insertAdjacentElement('afterbegin', react);

      ReactDom.render(
        // @ts-ignore
        <Provider store={store}>
          
        </Provider>,
        react,
      );
    });
  });
});
