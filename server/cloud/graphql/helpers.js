export function relateObject(TC, toTC, newField, field) {
  TC.addRelation(
    newField,
    () => ({
      resolver: toTC.get('$findOne'),
      args: {
        filter: (source) => ({
          _id: source[field].toString()
        }),
        sort: null,
        skip: null,
      },
      projection: { [field]: true },
    }),
  );
}

export function relateArray(TC, toTC, newField, field) {
  TC.addRelation(
    newField,
    () => ({
      resolver: toTC.getResolver('findByIds'),
      args: {
        _ids: source => source[field],
      },
      projection: { [field]: true },
    }),
  );
}

export function countArray(TC, fieldName, field) {
  TC.setField(fieldName, {
    type: 'Int',
    resolve: source => source[field] ? source[field].length : 0,
  });
}

export function addId(TC) {
  TC.setField('id', {
    type: 'String',
    resolve: source => source._id,
  });
}
