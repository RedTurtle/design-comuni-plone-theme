// import { render, screen } from '@testing-library/react';
// import '@testing-library/jest-dom/extend-expect';
// import OfficeCard from '../OfficeCard';
// import { flattenToAppURL } from '@plone/volto/helpers';

// import configureStore from 'redux-mock-store';
// import { Provider } from 'react-intl-redux';
// import { MemoryRouter } from 'react-router-dom';

// const mockStore = configureStore([]);

// const store = mockStore({
//   intl: {
//     locale: 'en',
//     messages: {},
//   },
// });

// it('renders content', () => {
//   render(
//     <Provider store={store}>
//       <MemoryRouter>
//         <OfficeCard
//           office={{
//             '@id':
//               'http://localhost:3000/amministrazione/uffici/assessorato-al-turismo',
//             '@type': 'UnitaOrganizzativa',
//             address: '',
//             circoscrizione: null,
//             city: 'Roma',
//             contact_info: {
//               blocks: {
//                 'b3225997-aad5-467c-8e4a-b868838188dd': {
//                   '@type': 'text',
//                 },
//               },
//               blocks_layout: {
//                 items: ['b3225997-aad5-467c-8e4a-b868838188dd'],
//               },
//             },
//             description: '',
//             design_italia_meta_type: 'Unita Organizzativa',
//             effective: null,
//             geolocation: {
//               latitude: 0,
//               longitude: 0,
//             },
//             has_children: true,
//             id: 'assessorato-al-turismo',
//             image_field: null,
//             image_scales: null,
//             nome_sede: null,
//             quartiere: null,
//             review_state: 'private',
//             street: 'Via Roma 1',
//             title: 'Assessorato al Turismo',
//             zip_code: '00100',
//           }}
//           content={[
//             {
//               '@id':
//                 'http://localhost:3000/amministrazione/uffici/assessorato-al-turismo',
//               '@type': 'UnitaOrganizzativa',
//               address: '',
//               circoscrizione: null,
//               city: 'Roma',
//               contact_info: {
//                 blocks: {
//                   'b3225997-aad5-467c-8e4a-b868838188dd': {
//                     '@type': 'text',
//                   },
//                 },
//                 blocks_layout: {
//                   items: ['b3225997-aad5-467c-8e4a-b868838188dd'],
//                 },
//               },
//               description: '',
//               design_italia_meta_type: 'Unita Organizzativa',
//               effective: null,
//               geolocation: {
//                 latitude: 0,
//                 longitude: 0,
//               },
//               has_children: true,
//               id: 'assessorato-al-turismo',
//               image_field: null,
//               image_scales: null,
//               nome_sede: null,
//               quartiere: null,
//               review_state: 'private',
//               street: 'Via Roma 1',
//               title: 'Assessorato al Turismo',
//               zip_code: '00100',
//             },
//           ]}
//         />
//       </MemoryRouter>
//     </Provider>,
//   );

//   expect(screen.getByText(/assessorato al turismo/i)).toBeInTheDocument();
// });
