import { createClient } from '@sanity/client';
import { useStateValue } from '../lib/state';

export async function loadData({
  dataset,
  apiVersion,
  projectId,
  query,
  params,
  dispatch,
}) {
  dispatch({ type: 'setLoading', payload: true });
  try {
    const client = createClient({
      projectId,
      dataset,
      apiVersion,
    });
    // eval === evil! ⬇ probably better
    // const parameters = JSON.parse(params);
    // eslint-disable-next-line no-eval
    const parameters = eval(`( ${params} )`);
    const queryResult = await client.fetch(query, parameters);
    console.log('queryResult: ', queryResult);

    dispatch({ type: 'setResult', payload: queryResult });
    dispatch({ type: 'setLoading', payload: false });
  } catch (err) {
    console.log('Ohhhh nooo!');
    console.log('err: ', err);
    dispatch({ type: 'setLoading', payload: false });
  }
}
