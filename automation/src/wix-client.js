const API_ROOT = 'https://www.wixapis.com/wix-data/v2';

function requiredEnvironment(name) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}

function headers() {
  return {
    Authorization: requiredEnvironment('WIX_API_KEY'),
    'Content-Type': 'application/json',
    'wix-site-id': requiredEnvironment('WIX_SITE_ID'),
  };
}

async function request(path, options = {}) {
  const response = await fetch(`${API_ROOT}${path}`, {
    ...options,
    headers: {
      ...headers(),
      ...options.headers,
    },
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(`Wix API ${response.status}: ${JSON.stringify(body)}`);
  }
  return body;
}

function unwrap(item) {
  return {
    id: item.id ?? item.data?._id,
    data: item.data ?? item,
  };
}

export async function queryItems(dataCollectionId, filter = undefined, limit = 100) {
  const query = {
    paging: {
      limit,
      offset: 0,
    },
  };
  if (filter) query.filter = filter;
  const result = await request('/items/query', {
    method: 'POST',
    body: JSON.stringify({
      dataCollectionId,
      query,
    }),
  });
  return (result.dataItems ?? result.items ?? []).map(unwrap);
}

function setField(fieldPath, value) {
  return {
    fieldPath,
    action: 'SET_FIELD',
    setFieldOptions: {
      value,
    },
  };
}

export async function bulkPatch(dataCollectionId, patches) {
  if (!patches.length) return [];
  const result = await request('/bulk/items/patch', {
    method: 'POST',
    body: JSON.stringify({
      dataCollectionId,
      patches: patches.map(({ id, fields }) => ({
        dataItemId: id,
        fieldModifications: Object.entries(fields).map(([fieldPath, value]) => setField(fieldPath, value)),
      })),
    }),
  });
  const outcomes = result.results ?? [];
  const failures = outcomes.filter((outcome) => outcome.itemMetadata?.success === false || outcome.error);
  if (failures.length) throw new Error(`Wix bulk patch failures: ${JSON.stringify(failures)}`);
  return outcomes;
}

export async function bulkSave(dataCollectionId, dataItems) {
  if (!dataItems.length) return [];
  const result = await request('/bulk/items/save', {
    method: 'POST',
    body: JSON.stringify({
      dataCollectionId,
      dataItems,
      returnEntity: true,
    }),
  });
  const outcomes = result.results ?? [];
  const failures = outcomes.filter((outcome) => outcome.itemMetadata?.success === false || outcome.error);
  if (failures.length) throw new Error(`Wix bulk save failures: ${JSON.stringify(failures)}`);
  return outcomes;
}
