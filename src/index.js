import isArray from 'lodash/isArray';

const serialize = ({ id, type, attributes }) => Object.assign({}, { id, type }, attributes);

const itemSerializer = ({ id, type, attributes }) => {
  const d = Object.assign({}, { id, type }, attributes);

  if (Object.prototype.hasOwnProperty.call(d, 'widget')) d.widget = d.widget.map(serialize);
  if (Object.prototype.hasOwnProperty.call(d, 'layer')) d.layer = d.layer.map(serialize);
  if (Object.prototype.hasOwnProperty.call(d, 'metadata')) d.metadata = d.metadata.map(serialize);
  if (Object.prototype.hasOwnProperty.call(d, 'vocabulary')) d.vocabulary = d.vocabulary.map(serialize);
  if (Object.prototype.hasOwnProperty.call(d, 'legendConfig') &&
    Object.prototype.hasOwnProperty.call(d.legendConfig, 'items')) {
    d.legendConfig.items = d.legendConfig.items.map((item, index) => {
      const i = Object.assign({}, item);
      i.id = i.id || index;
      return i;
    });
  }

  return d;
};

export const wriAPISerializer = ({ data }) => {
  if (data && isArray(data)) return data.map(itemSerializer);
  return itemSerializer(data);
};

export default wriAPISerializer;
