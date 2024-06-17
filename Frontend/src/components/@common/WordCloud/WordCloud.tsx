import ReactWordcloud, { Callbacks, Options } from '@cyberblast/react-wordcloud';

import { usePolicySearch } from '@/pages/PolicySearchPage/PolicySearch.hook';

import { useWordCloudQuery } from './WordCloud.query';

const options: Options = {
  colors: ['#B0E650', '#ff7f0e', '#4DD5CB', '#568CEC', '#CE7DFF', '#4FD87D'],
  enableTooltip: false,
  deterministic: false,
  fontFamily: 'JalnanGothic',
  fontSizes: [14, 60],
  fontStyle: 'normal',
  fontWeight: 'normal',
  padding: 4,
  rotations: 0,
  rotationAngles: [-90, 90],
  scale: 'sqrt',
  spiral: 'rectangular',
  transitionDuration: 1000,
  enableOptimizations: true,
  svgAttributes: {},
  textAttributes: {},
  tooltipOptions: {},
} as const;

function WordCloud() {
  const { words } = useWordCloudQuery();
  const { search } = usePolicySearch();

  const callbacks: Callbacks = {
    getWordTooltip: word => `The word "${word.text}" appears ${word.value} times.`,
    onWordClick: word => search(word.text),
  };

  return <ReactWordcloud words={words} options={options} callbacks={callbacks} />;
}

export default WordCloud;
