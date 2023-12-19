'use client';
import { useState } from 'react';
import styles from './CodeBlock.module.css';
import localFont from 'next/font/local';
import Copy from '@/public/icon/Copy';
import Button from '../buttons/Button';
const somtypeMono = localFont({
  src: [
    {
      path: './SometypeMono-VariableFont_wght.ttf',
      weight: '400',
      style: 'normal',
    },
  ],
});
const CodeBlock = () => {
  const [activeTab, setActiveTab] = useState<'python' | 'json'>('python');
  const CODE_PY = `import prism_data
  
api_key = "12345"
client = prism_data.client(api_key)
  
categories = client.categories(transactions)
  
features = client.features(transactions)
  
derived_income = client.derived_income(transactions)
  
cash_score = client.cash_score(transactions)`;
  const CODE_JSON = `const axios = require("axios").default;

const hostUrl = "https://api.nftbank.ai";
const assetContract = \${assetContract}\;
const tokenId = "2795";
  
const url = \${hostUrl}/v3/realtime-estimated-price/ethereum/\${assetContract}/\${tokenId};
const headers = {
  "x-api-key": "<YOUR API KEY>",
};
  
axios.get(url, { headers: headers }).then(function (response) {
  console.log(response.data);
});`;
  return (
    <div className={`${styles.container} relative`}>
      <div className={styles.tabWrapper}>
        <div
          className={`${styles.tab} ${
            activeTab === 'python' ? styles.active : ''
          }`}
          onClick={() => setActiveTab('python')}
        >
          <p
            className={`${somtypeMono.className} text-12 leading-24 font-normal`}
          >
            NFTBank_data.py
          </p>
        </div>
        <div
          className={`${styles.tab} ${
            activeTab === 'json' ? styles.active : ''
          }`}
          onClick={() => setActiveTab('json')}
        >
          <p
            className={`${somtypeMono.className}  text-12 leading-24 font-normal`}
          >
            NFTBank_data.js
          </p>
        </div>
      </div>
      <div className={`${somtypeMono.className} ${styles.codeBody}`}>
        <p
          className={`${somtypeMono.className}  text-14 leading-24 font-normal`}
        >
          {activeTab === 'python' ? CODE_PY : CODE_JSON}
        </p>
      </div>
      <Button
        className={`${styles.copyButton} absolute bottom-20 right-20`}
        id=''
      >
        <Copy className='w-16 h-16' />
      </Button>
    </div>
  );
};
export default CodeBlock;
