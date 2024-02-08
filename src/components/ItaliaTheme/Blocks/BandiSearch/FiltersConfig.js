//import { useSelector } from 'react-redux';
import DefaultFilters from 'design-comuni-plone-theme/components/ItaliaTheme/Blocks/BandiSearch/DefaultFilters';

/*
  ***
  componente da customizzare nel proprio sito per modificare/aggiungere tipologie di Filtri
  ***
 */
const FiltersConfig = (dispatchFilter, path) => {
  // const subsite = useSelector((state) => state.subsite?.data);
  const defaultFilters = DefaultFilters(path);

  return {
    ...defaultFilters,
    //aggiungere qui le proprie customizzazioni/nuovi filtri
  };
};

export default FiltersConfig;
