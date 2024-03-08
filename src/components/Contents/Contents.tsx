import React, { ComponentProps, useState } from 'react';
import './styles/basic/main.css';
import './styles/quanta/main.css';
import type { ActionsResponse } from '@plone/types';
import {
  TooltipTrigger,
  useDragAndDrop,
  type Selection,
} from 'react-aria-components';
import cx from 'classnames';
import {
  BinIcon,
  // AddIcon,
  Breadcrumbs,
  Container,
  CopyIcon,
  CutIcon,
  PasteIcon,
  PropertiesIcon,
  QuantaTextField,
  RenameIcon,
  StateIcon,
  TagIcon,
  Tooltip,
  UploadIcon,
} from '@plone/components';
import { Button } from '../Button';
import { Table } from '../Table/Table';
import { ContentsCell } from './ContentsCell';
// import { AddContentPopover } from './AddContentPopover';
import { indexes, defaultIndexes } from '../../helpers/indexes';
import type { ArrayElement, Brain } from '../../helpers/types';

interface ContentsProps {
  pathname: string;
  breadcrumbs: ComponentProps<typeof Breadcrumbs>['items'];
  objectActions: ActionsResponse['object'];
  title: string;
  loading: boolean;
  canPaste: boolean;
  items: Brain[];
  selected: Selection;
  setSelected: (value: Selection) => void;
  upload: () => Promise<void>;
  rename: () => Promise<void>;
  workflow: () => Promise<void>;
  tags: () => Promise<void>;
  properties: () => Promise<void>;
  cut: (value?: string) => Promise<void>;
  copy: (value?: string) => Promise<void>;
  paste: () => Promise<void>;
  deleteItem: (value?: string) => Promise<void>;
  orderItem: (id: string, delta: number) => Promise<void>;
  moveToTop: (index: number) => Promise<void>;
  moveToBottom: (index: number) => Promise<void>;
  // addableTypes: ComponentProps<typeof AddContentPopover>['addableTypes'];
}

/**
 * A table showing the contents of an object.
 *
 * It has a toolbar for interactions with the items and a searchbar for filtering.
 * Items can be sorted by drag and drop.
 */
export function Contents({
  pathname,
  breadcrumbs = [],
  objectActions,
  title,
  loading,
  canPaste,
  items,
  selected,
  setSelected,
  upload,
  rename,
  workflow,
  tags,
  properties,
  cut,
  copy,
  paste,
  deleteItem,
  orderItem,
  moveToTop,
  moveToBottom, // addableTypes,
}: ContentsProps) {
  // const [selected, setSelected] = useState<string[]>([]);

  // const folderContentsActions = objectActions.find(
  //   (action) => action.id === 'folderContents',
  // );

  // if (!folderContentsActions) {
  //   // TODO current volto returns the Unauthorized component here
  //   // it would be best if the permissions check was done at a higher level
  //   // and this remained null
  //   return null;
  // }

  const columns = [
    {
      id: 'title',
      name: 'Title',
      isRowHeader: true,
    },
    ...defaultIndexes.map((index) => ({
      id: index,
      name: indexes[index].label,
    })),
    {
      id: '_actions',
      name: 'Actions',
    },
  ] as const;

  const rows = items.map((item, itemIndex) =>
    columns.reduce<ArrayElement<ComponentProps<typeof Table>['rows']>>(
      (cells, column) => ({
        ...cells,
        [column.id]: (
          <ContentsCell
            key={column.id}
            item={item}
            column={column.id}
            onMoveToBottom={() => moveToBottom(itemIndex)}
            onMoveToTop={() => moveToTop(itemIndex)}
            onCut={() => cut(item['@id'])}
            onCopy={() => copy(item['@id'])}
            onDelete={() => deleteItem(item['@id'])}
          />
        ),
      }),
      { id: item['@id'] },
    ),
  );

  const { dragAndDropHooks } = useDragAndDrop({
    getItems: (keys) =>
      [...keys].map((key) => ({
        'text/plain': key.toString(),
      })),
    onReorder(e) {
      if (e.keys.size !== 1) {
        // TODO mostrare toast o rendere non ordinabile quando più di un elemento è selezionato
        console.error('Only one item can be moved at a time');
        return;
      }
      const target = [...e.keys][0];
      if (target === e.target.key) return;

      const item = items.find((item) => item['@id'] === target);
      if (!item) return;

      const initialPosition = rows.findIndex((row) => row.id === item['@id']);
      if (initialPosition === -1) return;

      const finalPosition = rows.findIndex((row) => row.id === e.target.key);

      let delta = finalPosition - initialPosition;
      if (delta > 0 && e.target.dropPosition === 'before') delta -= 1;
      if (delta < 0 && e.target.dropPosition === 'after') delta += 1;

      if (delta !== 0) {
        orderItem(item.id, delta);
      }
    },
  });

  return (
    <Container
      as="div"
      // id="page-contents"
      className="folder-contents"
      aria-live="polite"
      layout={false}
      narrow={false}
    >
      {/* TODO better loader */}
      {loading && <p>Loading...</p>}
      {/* TODO helmet setting title here... or should we do it at a higher level? */}
      <article id="content">
        <section className="topbar">
          <div className="title-block">
            <Breadcrumbs
              includeRoot={true}
              root="/contents"
              items={[...breadcrumbs].slice(0, -1)}
            />
            <h1>{title}</h1>
          </div>
          <div className="contents-actions">
            <TooltipTrigger>
              <Button
                className="react-aria-Button contents-action-trigger upload"
                onPress={upload}
              >
                <UploadIcon />
              </Button>
              <Tooltip placement="bottom">Upload</Tooltip>
            </TooltipTrigger>
            <TooltipTrigger>
              <Button
                className="react-aria-Button contents-action-trigger rename"
                onPress={rename}
                isDisabled={selected !== 'all' && selected.size === 0}
              >
                <RenameIcon />
              </Button>
              <Tooltip placement="bottom">Rename</Tooltip>
            </TooltipTrigger>
            <TooltipTrigger>
              <Button
                className="react-aria-Button contents-action-trigger state"
                onPress={workflow}
                isDisabled={selected !== 'all' && selected.size === 0}
              >
                <StateIcon />
              </Button>
              <Tooltip placement="bottom">State</Tooltip>
            </TooltipTrigger>
            <TooltipTrigger>
              <Button
                className="react-aria-Button contents-action-trigger categories"
                onPress={tags}
                isDisabled={selected !== 'all' && selected.size === 0}
              >
                <TagIcon />
              </Button>
              <Tooltip placement="bottom">Categories</Tooltip>
            </TooltipTrigger>
            <TooltipTrigger>
              <Button
                className="react-aria-Button contents-action-trigger properties"
                onPress={properties}
                isDisabled={selected !== 'all' && selected.size === 0}
              >
                <PropertiesIcon />
              </Button>
              <Tooltip placement="bottom">Properties</Tooltip>
            </TooltipTrigger>
            <TooltipTrigger>
              <Button
                className="react-aria-Button contents-action-trigger cut"
                onPress={() => cut()}
                isDisabled={selected !== 'all' && selected.size === 0}
              >
                <CutIcon />
              </Button>
              <Tooltip placement="bottom">Cut</Tooltip>
            </TooltipTrigger>
            <TooltipTrigger>
              <Button
                className="react-aria-Button contents-action-trigger copy"
                onPress={() => copy()}
                isDisabled={selected !== 'all' && selected.size === 0}
              >
                <CopyIcon />
              </Button>
              <Tooltip placement="bottom">Copy</Tooltip>
            </TooltipTrigger>
            <TooltipTrigger>
              <Button
                className="react-aria-Button contents-action-trigger paste"
                onPress={paste}
                isDisabled={!canPaste}
              >
                <PasteIcon />
              </Button>
              <Tooltip placement="bottom">Paste</Tooltip>
            </TooltipTrigger>
            <TooltipTrigger>
              <Button
                className="react-aria-Button contents-action-trigger delete"
                onPress={() => deleteItem()}
                isDisabled={selected !== 'all' && selected.size === 0}
              >
                <BinIcon />
              </Button>
              <Tooltip placement="bottom">Delete</Tooltip>
            </TooltipTrigger>
          </div>
          <QuantaTextField
            name="sortable_title"
            placeholder="Search site"
            className="search-input"
          />
          {/* <TooltipTrigger>
            <DialogTrigger>
              <Button className="react-aria-Button add">
                <AddIcon />
              </Button>
              <AddContentPopover path={path} addableTypes={addableTypes} />
            </DialogTrigger>
            <Tooltip className="react-aria-Tooltip tooltip" placement="bottom">
              Add content
            </Tooltip>
          </TooltipTrigger> */}
        </section>
        <section className="contents-table">
          <Table
            aria-label="Contents"
            columns={[...columns]}
            rows={rows}
            selectionMode="multiple"
            selectedKeys={selected}
            onSelectionChange={setSelected}
            dragAndDropHooks={dragAndDropHooks}
            // onRowSelection={onRowSelection}
            // resizableColumns={true}
          />
        </section>
      </article>
    </Container>
  );
}
