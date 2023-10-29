import React from 'react';
import { FixedSizeList as List } from 'react-window';
import { AutoSizer } from 'react-virtualized';
import { JSONTree } from 'react-json-tree';

interface ViewerProps {
  data: any[];
}

const JSONTreeViewer: React.FC<ViewerProps> = ({ data }) => {
  const itemSize = 500;
  const theme = {
    scheme: 'monokai',
    base00: '#ffffff',
    base01: '#383830',
    base02: '#49483e',
    base03: '#75715e',
    base04: '#a59f85',
    base05: '#f8f8f2',
    base06: '#f5f4f1',
    base07: '#f9f8f5',
    base08: '#f92672',
    base09: '#fd971f',
    base0A: '#f4bf75',
    base0B: '#000000',
    base0C: '#a1efe4',
    base0D: '#4E9590',
    base0E: '#ae81ff',
    base0F: '#cc6633',
  };;

  const Row = () => {
    return (
      <div className='lg:w-[60vw] w-full m-auto z-0 pb-48 px-4'>
        <JSONTree
          data={data}
          theme={theme}
          getItemString={(_type, _data, itemType, itemString, _keyPath) => {
            return <span>{itemType} {itemString}</span>;
          }}
          shouldExpandNodeInitially={(_keyName, _data, level) => {
            return level <= 4;
          }}
          keyPath={["JSONTreeViewer"]}
        />
      </div>
    );
  };

  return (
    <AutoSizer>
      {() => (
        <List
          height={1000}
          itemCount={[data].length}
          itemSize={itemSize}
          width={1200}
        >
          {Row}
        </List>
      )}
    </AutoSizer>
  );
};

export default JSONTreeViewer;