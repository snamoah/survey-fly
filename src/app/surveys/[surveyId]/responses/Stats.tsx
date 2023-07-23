'use client';

import { ResponsivePie } from '@nivo/pie';
import { ResponsiveLine } from '@nivo/line';
import { ResponsiveChoropleth } from '@nivo/geo';

import { classNames } from '@/utils';
import worldCountries from '@/utils/constants/worldCountries.json';
import { ResponsiveBar } from '@nivo/bar';

const widgetClassName = 'rounded-sm bg-white ring-1 ring-slate-400 h-60';

const data = [
  {
    id: 'mobile',
    label: 'mobile',
    value: 535,
    color: 'hsl(8, 70%, 50%)',
  },
  {
    id: 'web',
    label: 'web',
    value: 305,
    color: 'hsl(14, 70%, 50%)',
  },
];

const lineData = [
  {
    id: 'responses',
    color: 'hsl(307, 70%, 50%)',
    data: [
      {
        x: 'Jul 15',
        y: 223,
      },
      {
        x: 'Jul 16',
        y: 70,
      },
      {
        x: 'Jul 17',
        y: 214,
      },
      {
        x: 'Jul 18',
        y: 182,
      },
      {
        x: 'Jul 19',
        y: 163,
      },
      {
        x: 'Jul 20',
        y: 136,
      },
      {
        x: 'Jul 21',
        y: 8,
      },
      {
        x: 'Jul 22',
        y: 191,
      },
      {
        x: 'Jul 23',
        y: 274,
      },
    ],
  },
];

const geoData = [
  {
    id: 'AFG',
    value: 790846,
  },
  {
    id: 'AGO',
    value: 271480,
  },
  {
    id: 'LBY',
    value: 357603,
  },
  {
    id: 'LKA',
    value: 326040,
  },
  {
    id: 'LSO',
    value: 263213,
  },
  {
    id: 'LTU',
    value: 527406,
  },
  {
    id: 'LUX',
    value: 805556,
  },
  {
    id: 'LVA',
    value: 134523,
  },
  {
    id: 'MAR',
    value: 586839,
  },
  {
    id: 'MDA',
    value: 49213,
  },
  {
    id: 'MDG',
    value: 908616,
  },
  {
    id: 'KOR',
    value: 305095,
  },
];

const barData = [
  {
    country: 'AD',
    'hot dog': 70,
    'hot dogColor': 'hsl(152, 70%, 50%)',
  },
  {
    country: 'AE',
    'hot dog': 31,
    'hot dogColor': 'hsl(38, 70%, 50%)',
  },
  {
    country: 'AF',
    'hot dog': 119,
    'hot dogColor': 'hsl(233, 70%, 50%)',
  },
  {
    country: 'AG',
    'hot dog': 43,
    'hot dogColor': 'hsl(34, 70%, 50%)',
  },
  {
    country: 'AL',
    'hot dog': 32,
    'hot dogColor': 'hsl(352, 70%, 50%)',
  },
  {
    country: 'AM',
    'hot dog': 17,
    'hot dogColor': 'hsl(222, 70%, 50%)',
  },
];

export const Stats = () => (
  <div className="grid h-full grid-cols-6 gap-3 overflow-y-auto bg-slate-100 p-4">
    <article className={classNames('col-span-2', widgetClassName)}>
      <ResponsivePie
        data={data}
        enableArcLinkLabels={false}
        activeOuterRadiusOffset={4}
        margin={{ top: 20, right: 60, bottom: 60, left: 60 }}
        colors={{ scheme: 'blues' }}
        borderWidth={1}
        borderColor={{
          from: 'color',
          modifiers: [['darker', 0.2]],
        }}
        legends={[
          {
            anchor: 'bottom',
            direction: 'row',
            justify: false,
            translateX: 0,
            translateY: 40,
            itemsSpacing: 0,
            itemWidth: 100,
            itemHeight: 10,
            itemTextColor: '#999',
            itemDirection: 'left-to-right',
            itemOpacity: 1,
            symbolSize: 8,
            symbolShape: 'circle',
            effects: [
              {
                on: 'hover',
                style: {
                  itemTextColor: '#000',
                },
              },
            ],
          },
        ]}
      />
    </article>
    <article className={classNames(widgetClassName, 'col-span-3')}>
      <ResponsiveLine
        useMesh
        data={lineData}
        enableSlices="x"
        curve="monotoneX"
        yScale={{ type: 'linear' }}
        margin={{ top: 20, right: 30, bottom: 40, left: 30 }}
        axisLeft={{
          renderTick: () => <></>,
          tickValues: 5,
        }}
      />
    </article>
    <article className={classNames(widgetClassName)}></article>
    <article className={classNames(widgetClassName, 'col-span-3')}>
      <ResponsiveChoropleth
        data={geoData}
        features={worldCountries.features}
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
        projectionType="equirectangular"
        colors="blues"
        domain={[0, 1000000]}
        unknownColor="#efefef"
        label="properties.name"
        valueFormat=".2s"
        projectionTranslation={[0.5, 0.5]}
        projectionRotation={[0, 0, 0]}
        enableGraticule={true}
        graticuleLineColor="#dddddd"
        borderWidth={0.5}
        borderColor="#152538"
      />
    </article>
    <article className={classNames(widgetClassName, 'col-span-3')}>
      <ResponsiveBar
        data={barData}
        keys={['hot dog']}
        indexBy="country"
        margin={{ top: 30, right: 30, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: 'linear' }}
        borderColor={{
          from: 'color',
          modifiers: [['darker', 1.6]],
        }}
        axisBottom={{
          legend: 'country',
          legendPosition: 'middle',
          legendOffset: 32,
        }}
        axisLeft={{
          legend: 'food',
          legendPosition: 'middle',
          legendOffset: -40,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
          from: 'color',
          modifiers: [['darker', 1.6]],
        }}
        role="application"
        ariaLabel="Nivo bar chart demo"
        barAriaLabel={(e) =>
          e.id + ': ' + e.formattedValue + ' in country: ' + e.indexValue
        }
      />
    </article>
    <article className={classNames(widgetClassName, 'col-span-2')}></article>
  </div>
);
