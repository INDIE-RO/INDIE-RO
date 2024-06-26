import ReactGA from 'react-ga4';

import { AdorableWordCloud, CloudWord, Options } from 'adorable-word-cloud';

import { usePolicySearch } from '@/pages/PolicySearchPage/PolicySearch.hook';

import { useWordCloudQuery } from './WordCloud.query';

const options: Options = {
  colors: ['#B0E650', '#ff7f0e', '#4DD5CB', '#568CEC', '#CE7DFF', '#4FD87D'],
  fontFamily: 'JalnanGothic',
  fontSizeRange: [20, 60],
  rotationDivision: 0,
};

function WordCloud() {
  const { words } = useWordCloudQuery();
  const { search } = usePolicySearch();

  const onWordClick = (word: CloudWord) => {
    ReactGA.event({
      category: '버튼',
      action: '워드클라우드 키워드 클릭',
      label: 'word-cloud',
    });

    search(word.text);
  };

  return <AdorableWordCloud words={words} options={options} callbacks={{ onWordClick }} />;
}

export default WordCloud;
