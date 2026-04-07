// @ts-nocheck
import { fullFormats } from 'ajv-formats/dist/formats.js';
export const validate = validate20;
export default validate20;
const schema31 = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  additionalProperties: true,
  properties: {
    type: {
      type: 'array',
      readOnly: true,
      default: ['RegisteredIdentity'],
      items: { type: 'string' },
      allOf: [{ contains: { const: 'RegisteredIdentity', minContains: 1 } }],
    },
    id: {
      example: 'did:web:samplecompany.com/123456789',
      type: 'string',
      format: 'uri',
      description:
        'The DID that is controlled by the registered member and is linked to the registeredID through this Identity Anchor credential',
    },
    registeredName: {
      example: 'Sample business Ltd',
      type: 'string',
      description:
        'The registered name of the entity within the identifier scheme.  Examples: product - EV battery 300Ah, Party - Sample Company Pty Ltd,  Facility - Green Acres battery factory ',
    },
    registeredId: {
      example: 123456789,
      type: 'string',
      description:
        'The registration number (alphanumeric) of the entity within the register. Unique within the register.',
    },
    registeredDate: {
      type: 'string',
      format: 'date',
      description: 'The date on which this identity was first registered with the registrar.',
    },
    publicInformation: {
      type: 'string',
      format: 'uri',
      description:
        'A link to further information about the registered entity on the authoritative registrar site.',
    },
    idScheme: {
      $ref: '#/$defs/IdentifierScheme',
      description: 'The identifier scheme operated by the registrar',
    },
    registrar: {
      type: 'object',
      properties: {
        type: {
          type: 'array',
          readOnly: true,
          default: ['Party'],
          items: { type: 'string' },
          allOf: [{ contains: { const: 'Party', minContains: 1 } }],
        },
        id: {
          example: 'https://sample-business-register.gov/123456789',
          type: 'string',
          format: 'uri',
          description:
            'Globally unique identifier of this party. Typically represented as a URI identifierScheme/Identifier URI',
        },
        name: {
          example: 'Sample Company Ltd',
          type: 'string',
          description: 'Legal registered name of this party.',
        },
      },
      required: ['id', 'name'],
      description: 'The registrar party that operates the register.',
    },
    registerType: {
      type: 'string',
      enum: ['product', 'facility', 'business', 'trademark', 'land', 'accreditation'],
      example: 'product',
      description:
        'The thematic purpose of the register - organisations, facilities, products, trademarks, etc',
    },
    registrationScope: {
      type: 'array',
      items: { type: 'string', format: 'uri' },
      description:
        'List of URIs that represent the roles or scopes of membership. For example ["https://abr.business.gov.au/Help/EntityTypeDescription?Id=19"]',
    },
  },
  description:
    'The identity anchor is a mapping between a registry member identity and one or more decentralised identifiers owned by the member. It may also list a set of membership scopes.',
  required: ['id', 'registeredName', 'registeredId', 'registeredDate', 'idScheme', 'registerType'],
  $defs: {
    IdentifierScheme: {
      type: 'object',
      additionalProperties: false,
      properties: {
        type: {
          type: 'array',
          readOnly: true,
          default: ['IdentifierScheme'],
          items: { type: 'string' },
          allOf: [{ contains: { const: 'IdentifierScheme', minContains: 1 } }],
        },
        id: { type: 'string', format: 'uri', description: 'The URI of this identifier scheme' },
        name: {
          example: 'Global Identifier Scheme Name',
          type: 'string',
          description: 'The name of the identifier scheme. ',
        },
      },
      description:
        'An identifier registration scheme for products, facilities, or organisations. Typically operated by a state, national or global authority.',
      required: ['id', 'name'],
    },
  },
};
const schema32 = {
  type: 'object',
  additionalProperties: false,
  properties: {
    type: {
      type: 'array',
      readOnly: true,
      default: ['IdentifierScheme'],
      items: { type: 'string' },
      allOf: [{ contains: { const: 'IdentifierScheme', minContains: 1 } }],
    },
    id: { type: 'string', format: 'uri', description: 'The URI of this identifier scheme' },
    name: {
      example: 'Global Identifier Scheme Name',
      type: 'string',
      description: 'The name of the identifier scheme. ',
    },
  },
  description:
    'An identifier registration scheme for products, facilities, or organisations. Typically operated by a state, national or global authority.',
  required: ['id', 'name'],
};
const formats0 = fullFormats.uri;
const formats2 = fullFormats.date;
function validate20(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {},
) {
  let vErrors = null;
  let errors = 0;
  const evaluated0 = validate20.evaluated;
  if (evaluated0.dynamicProps) {
    evaluated0.props = undefined;
  }
  if (evaluated0.dynamicItems) {
    evaluated0.items = undefined;
  }
  if (data && typeof data == 'object' && !Array.isArray(data)) {
    if (data.id === undefined) {
      const err0 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: { missingProperty: 'id' },
        message: "must have required property '" + 'id' + "'",
      };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.registeredName === undefined) {
      const err1 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: { missingProperty: 'registeredName' },
        message: "must have required property '" + 'registeredName' + "'",
      };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.registeredId === undefined) {
      const err2 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: { missingProperty: 'registeredId' },
        message: "must have required property '" + 'registeredId' + "'",
      };
      if (vErrors === null) {
        vErrors = [err2];
      } else {
        vErrors.push(err2);
      }
      errors++;
    }
    if (data.registeredDate === undefined) {
      const err3 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: { missingProperty: 'registeredDate' },
        message: "must have required property '" + 'registeredDate' + "'",
      };
      if (vErrors === null) {
        vErrors = [err3];
      } else {
        vErrors.push(err3);
      }
      errors++;
    }
    if (data.idScheme === undefined) {
      const err4 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: { missingProperty: 'idScheme' },
        message: "must have required property '" + 'idScheme' + "'",
      };
      if (vErrors === null) {
        vErrors = [err4];
      } else {
        vErrors.push(err4);
      }
      errors++;
    }
    if (data.registerType === undefined) {
      const err5 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: { missingProperty: 'registerType' },
        message: "must have required property '" + 'registerType' + "'",
      };
      if (vErrors === null) {
        vErrors = [err5];
      } else {
        vErrors.push(err5);
      }
      errors++;
    }
    if (data.type !== undefined) {
      let data0 = data.type;
      if (Array.isArray(data0)) {
        const _errs5 = errors;
        const len0 = data0.length;
        for (let i0 = 0; i0 < len0; i0++) {
          const _errs6 = errors;
          if ('RegisteredIdentity' !== data0[i0]) {
            const err6 = {
              instancePath: instancePath + '/type/' + i0,
              schemaPath: '#/properties/type/allOf/0/contains/const',
              keyword: 'const',
              params: { allowedValue: 'RegisteredIdentity' },
              message: 'must be equal to constant',
            };
            if (vErrors === null) {
              vErrors = [err6];
            } else {
              vErrors.push(err6);
            }
            errors++;
          }
          var valid2 = _errs6 === errors;
          if (valid2) {
            break;
          }
        }
        if (!valid2) {
          const err7 = {
            instancePath: instancePath + '/type',
            schemaPath: '#/properties/type/allOf/0/contains',
            keyword: 'contains',
            params: { minContains: 1 },
            message: 'must contain at least 1 valid item(s)',
          };
          if (vErrors === null) {
            vErrors = [err7];
          } else {
            vErrors.push(err7);
          }
          errors++;
        } else {
          errors = _errs5;
          if (vErrors !== null) {
            if (_errs5) {
              vErrors.length = _errs5;
            } else {
              vErrors = null;
            }
          }
        }
      }
      if (Array.isArray(data0)) {
        const len1 = data0.length;
        for (let i1 = 0; i1 < len1; i1++) {
          if (typeof data0[i1] !== 'string') {
            const err8 = {
              instancePath: instancePath + '/type/' + i1,
              schemaPath: '#/properties/type/items/type',
              keyword: 'type',
              params: { type: 'string' },
              message: 'must be string',
            };
            if (vErrors === null) {
              vErrors = [err8];
            } else {
              vErrors.push(err8);
            }
            errors++;
          }
        }
      } else {
        const err9 = {
          instancePath: instancePath + '/type',
          schemaPath: '#/properties/type/type',
          keyword: 'type',
          params: { type: 'array' },
          message: 'must be array',
        };
        if (vErrors === null) {
          vErrors = [err9];
        } else {
          vErrors.push(err9);
        }
        errors++;
      }
    }
    if (data.id !== undefined) {
      let data3 = data.id;
      if (typeof data3 === 'string') {
        if (!formats0(data3)) {
          const err10 = {
            instancePath: instancePath + '/id',
            schemaPath: '#/properties/id/format',
            keyword: 'format',
            params: { format: 'uri' },
            message: 'must match format "' + 'uri' + '"',
          };
          if (vErrors === null) {
            vErrors = [err10];
          } else {
            vErrors.push(err10);
          }
          errors++;
        }
      } else {
        const err11 = {
          instancePath: instancePath + '/id',
          schemaPath: '#/properties/id/type',
          keyword: 'type',
          params: { type: 'string' },
          message: 'must be string',
        };
        if (vErrors === null) {
          vErrors = [err11];
        } else {
          vErrors.push(err11);
        }
        errors++;
      }
    }
    if (data.registeredName !== undefined) {
      if (typeof data.registeredName !== 'string') {
        const err12 = {
          instancePath: instancePath + '/registeredName',
          schemaPath: '#/properties/registeredName/type',
          keyword: 'type',
          params: { type: 'string' },
          message: 'must be string',
        };
        if (vErrors === null) {
          vErrors = [err12];
        } else {
          vErrors.push(err12);
        }
        errors++;
      }
    }
    if (data.registeredId !== undefined) {
      if (typeof data.registeredId !== 'string') {
        const err13 = {
          instancePath: instancePath + '/registeredId',
          schemaPath: '#/properties/registeredId/type',
          keyword: 'type',
          params: { type: 'string' },
          message: 'must be string',
        };
        if (vErrors === null) {
          vErrors = [err13];
        } else {
          vErrors.push(err13);
        }
        errors++;
      }
    }
    if (data.registeredDate !== undefined) {
      let data6 = data.registeredDate;
      if (typeof data6 === 'string') {
        if (!formats2.validate(data6)) {
          const err14 = {
            instancePath: instancePath + '/registeredDate',
            schemaPath: '#/properties/registeredDate/format',
            keyword: 'format',
            params: { format: 'date' },
            message: 'must match format "' + 'date' + '"',
          };
          if (vErrors === null) {
            vErrors = [err14];
          } else {
            vErrors.push(err14);
          }
          errors++;
        }
      } else {
        const err15 = {
          instancePath: instancePath + '/registeredDate',
          schemaPath: '#/properties/registeredDate/type',
          keyword: 'type',
          params: { type: 'string' },
          message: 'must be string',
        };
        if (vErrors === null) {
          vErrors = [err15];
        } else {
          vErrors.push(err15);
        }
        errors++;
      }
    }
    if (data.publicInformation !== undefined) {
      let data7 = data.publicInformation;
      if (typeof data7 === 'string') {
        if (!formats0(data7)) {
          const err16 = {
            instancePath: instancePath + '/publicInformation',
            schemaPath: '#/properties/publicInformation/format',
            keyword: 'format',
            params: { format: 'uri' },
            message: 'must match format "' + 'uri' + '"',
          };
          if (vErrors === null) {
            vErrors = [err16];
          } else {
            vErrors.push(err16);
          }
          errors++;
        }
      } else {
        const err17 = {
          instancePath: instancePath + '/publicInformation',
          schemaPath: '#/properties/publicInformation/type',
          keyword: 'type',
          params: { type: 'string' },
          message: 'must be string',
        };
        if (vErrors === null) {
          vErrors = [err17];
        } else {
          vErrors.push(err17);
        }
        errors++;
      }
    }
    if (data.idScheme !== undefined) {
      let data8 = data.idScheme;
      if (data8 && typeof data8 == 'object' && !Array.isArray(data8)) {
        if (data8.id === undefined) {
          const err18 = {
            instancePath: instancePath + '/idScheme',
            schemaPath: '#/$defs/IdentifierScheme/required',
            keyword: 'required',
            params: { missingProperty: 'id' },
            message: "must have required property '" + 'id' + "'",
          };
          if (vErrors === null) {
            vErrors = [err18];
          } else {
            vErrors.push(err18);
          }
          errors++;
        }
        if (data8.name === undefined) {
          const err19 = {
            instancePath: instancePath + '/idScheme',
            schemaPath: '#/$defs/IdentifierScheme/required',
            keyword: 'required',
            params: { missingProperty: 'name' },
            message: "must have required property '" + 'name' + "'",
          };
          if (vErrors === null) {
            vErrors = [err19];
          } else {
            vErrors.push(err19);
          }
          errors++;
        }
        for (const key0 in data8) {
          if (!(key0 === 'type' || key0 === 'id' || key0 === 'name')) {
            const err20 = {
              instancePath: instancePath + '/idScheme',
              schemaPath: '#/$defs/IdentifierScheme/additionalProperties',
              keyword: 'additionalProperties',
              params: { additionalProperty: key0 },
              message: 'must NOT have additional properties',
            };
            if (vErrors === null) {
              vErrors = [err20];
            } else {
              vErrors.push(err20);
            }
            errors++;
          }
        }
        if (data8.type !== undefined) {
          let data9 = data8.type;
          if (Array.isArray(data9)) {
            const _errs26 = errors;
            const len2 = data9.length;
            for (let i2 = 0; i2 < len2; i2++) {
              const _errs27 = errors;
              if ('IdentifierScheme' !== data9[i2]) {
                const err21 = {
                  instancePath: instancePath + '/idScheme/type/' + i2,
                  schemaPath: '#/$defs/IdentifierScheme/properties/type/allOf/0/contains/const',
                  keyword: 'const',
                  params: { allowedValue: 'IdentifierScheme' },
                  message: 'must be equal to constant',
                };
                if (vErrors === null) {
                  vErrors = [err21];
                } else {
                  vErrors.push(err21);
                }
                errors++;
              }
              var valid8 = _errs27 === errors;
              if (valid8) {
                break;
              }
            }
            if (!valid8) {
              const err22 = {
                instancePath: instancePath + '/idScheme/type',
                schemaPath: '#/$defs/IdentifierScheme/properties/type/allOf/0/contains',
                keyword: 'contains',
                params: { minContains: 1 },
                message: 'must contain at least 1 valid item(s)',
              };
              if (vErrors === null) {
                vErrors = [err22];
              } else {
                vErrors.push(err22);
              }
              errors++;
            } else {
              errors = _errs26;
              if (vErrors !== null) {
                if (_errs26) {
                  vErrors.length = _errs26;
                } else {
                  vErrors = null;
                }
              }
            }
          }
          if (Array.isArray(data9)) {
            const len3 = data9.length;
            for (let i3 = 0; i3 < len3; i3++) {
              if (typeof data9[i3] !== 'string') {
                const err23 = {
                  instancePath: instancePath + '/idScheme/type/' + i3,
                  schemaPath: '#/$defs/IdentifierScheme/properties/type/items/type',
                  keyword: 'type',
                  params: { type: 'string' },
                  message: 'must be string',
                };
                if (vErrors === null) {
                  vErrors = [err23];
                } else {
                  vErrors.push(err23);
                }
                errors++;
              }
            }
          } else {
            const err24 = {
              instancePath: instancePath + '/idScheme/type',
              schemaPath: '#/$defs/IdentifierScheme/properties/type/type',
              keyword: 'type',
              params: { type: 'array' },
              message: 'must be array',
            };
            if (vErrors === null) {
              vErrors = [err24];
            } else {
              vErrors.push(err24);
            }
            errors++;
          }
        }
        if (data8.id !== undefined) {
          let data12 = data8.id;
          if (typeof data12 === 'string') {
            if (!formats0(data12)) {
              const err25 = {
                instancePath: instancePath + '/idScheme/id',
                schemaPath: '#/$defs/IdentifierScheme/properties/id/format',
                keyword: 'format',
                params: { format: 'uri' },
                message: 'must match format "' + 'uri' + '"',
              };
              if (vErrors === null) {
                vErrors = [err25];
              } else {
                vErrors.push(err25);
              }
              errors++;
            }
          } else {
            const err26 = {
              instancePath: instancePath + '/idScheme/id',
              schemaPath: '#/$defs/IdentifierScheme/properties/id/type',
              keyword: 'type',
              params: { type: 'string' },
              message: 'must be string',
            };
            if (vErrors === null) {
              vErrors = [err26];
            } else {
              vErrors.push(err26);
            }
            errors++;
          }
        }
        if (data8.name !== undefined) {
          if (typeof data8.name !== 'string') {
            const err27 = {
              instancePath: instancePath + '/idScheme/name',
              schemaPath: '#/$defs/IdentifierScheme/properties/name/type',
              keyword: 'type',
              params: { type: 'string' },
              message: 'must be string',
            };
            if (vErrors === null) {
              vErrors = [err27];
            } else {
              vErrors.push(err27);
            }
            errors++;
          }
        }
      } else {
        const err28 = {
          instancePath: instancePath + '/idScheme',
          schemaPath: '#/$defs/IdentifierScheme/type',
          keyword: 'type',
          params: { type: 'object' },
          message: 'must be object',
        };
        if (vErrors === null) {
          vErrors = [err28];
        } else {
          vErrors.push(err28);
        }
        errors++;
      }
    }
    if (data.registrar !== undefined) {
      let data14 = data.registrar;
      if (data14 && typeof data14 == 'object' && !Array.isArray(data14)) {
        if (data14.id === undefined) {
          const err29 = {
            instancePath: instancePath + '/registrar',
            schemaPath: '#/properties/registrar/required',
            keyword: 'required',
            params: { missingProperty: 'id' },
            message: "must have required property '" + 'id' + "'",
          };
          if (vErrors === null) {
            vErrors = [err29];
          } else {
            vErrors.push(err29);
          }
          errors++;
        }
        if (data14.name === undefined) {
          const err30 = {
            instancePath: instancePath + '/registrar',
            schemaPath: '#/properties/registrar/required',
            keyword: 'required',
            params: { missingProperty: 'name' },
            message: "must have required property '" + 'name' + "'",
          };
          if (vErrors === null) {
            vErrors = [err30];
          } else {
            vErrors.push(err30);
          }
          errors++;
        }
        if (data14.type !== undefined) {
          let data15 = data14.type;
          if (Array.isArray(data15)) {
            const _errs39 = errors;
            const len4 = data15.length;
            for (let i4 = 0; i4 < len4; i4++) {
              const _errs40 = errors;
              if ('Party' !== data15[i4]) {
                const err31 = {
                  instancePath: instancePath + '/registrar/type/' + i4,
                  schemaPath: '#/properties/registrar/properties/type/allOf/0/contains/const',
                  keyword: 'const',
                  params: { allowedValue: 'Party' },
                  message: 'must be equal to constant',
                };
                if (vErrors === null) {
                  vErrors = [err31];
                } else {
                  vErrors.push(err31);
                }
                errors++;
              }
              var valid13 = _errs40 === errors;
              if (valid13) {
                break;
              }
            }
            if (!valid13) {
              const err32 = {
                instancePath: instancePath + '/registrar/type',
                schemaPath: '#/properties/registrar/properties/type/allOf/0/contains',
                keyword: 'contains',
                params: { minContains: 1 },
                message: 'must contain at least 1 valid item(s)',
              };
              if (vErrors === null) {
                vErrors = [err32];
              } else {
                vErrors.push(err32);
              }
              errors++;
            } else {
              errors = _errs39;
              if (vErrors !== null) {
                if (_errs39) {
                  vErrors.length = _errs39;
                } else {
                  vErrors = null;
                }
              }
            }
          }
          if (Array.isArray(data15)) {
            const len5 = data15.length;
            for (let i5 = 0; i5 < len5; i5++) {
              if (typeof data15[i5] !== 'string') {
                const err33 = {
                  instancePath: instancePath + '/registrar/type/' + i5,
                  schemaPath: '#/properties/registrar/properties/type/items/type',
                  keyword: 'type',
                  params: { type: 'string' },
                  message: 'must be string',
                };
                if (vErrors === null) {
                  vErrors = [err33];
                } else {
                  vErrors.push(err33);
                }
                errors++;
              }
            }
          } else {
            const err34 = {
              instancePath: instancePath + '/registrar/type',
              schemaPath: '#/properties/registrar/properties/type/type',
              keyword: 'type',
              params: { type: 'array' },
              message: 'must be array',
            };
            if (vErrors === null) {
              vErrors = [err34];
            } else {
              vErrors.push(err34);
            }
            errors++;
          }
        }
        if (data14.id !== undefined) {
          let data18 = data14.id;
          if (typeof data18 === 'string') {
            if (!formats0(data18)) {
              const err35 = {
                instancePath: instancePath + '/registrar/id',
                schemaPath: '#/properties/registrar/properties/id/format',
                keyword: 'format',
                params: { format: 'uri' },
                message: 'must match format "' + 'uri' + '"',
              };
              if (vErrors === null) {
                vErrors = [err35];
              } else {
                vErrors.push(err35);
              }
              errors++;
            }
          } else {
            const err36 = {
              instancePath: instancePath + '/registrar/id',
              schemaPath: '#/properties/registrar/properties/id/type',
              keyword: 'type',
              params: { type: 'string' },
              message: 'must be string',
            };
            if (vErrors === null) {
              vErrors = [err36];
            } else {
              vErrors.push(err36);
            }
            errors++;
          }
        }
        if (data14.name !== undefined) {
          if (typeof data14.name !== 'string') {
            const err37 = {
              instancePath: instancePath + '/registrar/name',
              schemaPath: '#/properties/registrar/properties/name/type',
              keyword: 'type',
              params: { type: 'string' },
              message: 'must be string',
            };
            if (vErrors === null) {
              vErrors = [err37];
            } else {
              vErrors.push(err37);
            }
            errors++;
          }
        }
      } else {
        const err38 = {
          instancePath: instancePath + '/registrar',
          schemaPath: '#/properties/registrar/type',
          keyword: 'type',
          params: { type: 'object' },
          message: 'must be object',
        };
        if (vErrors === null) {
          vErrors = [err38];
        } else {
          vErrors.push(err38);
        }
        errors++;
      }
    }
    if (data.registerType !== undefined) {
      let data20 = data.registerType;
      if (typeof data20 !== 'string') {
        const err39 = {
          instancePath: instancePath + '/registerType',
          schemaPath: '#/properties/registerType/type',
          keyword: 'type',
          params: { type: 'string' },
          message: 'must be string',
        };
        if (vErrors === null) {
          vErrors = [err39];
        } else {
          vErrors.push(err39);
        }
        errors++;
      }
      if (
        !(
          data20 === 'product' ||
          data20 === 'facility' ||
          data20 === 'business' ||
          data20 === 'trademark' ||
          data20 === 'land' ||
          data20 === 'accreditation'
        )
      ) {
        const err40 = {
          instancePath: instancePath + '/registerType',
          schemaPath: '#/properties/registerType/enum',
          keyword: 'enum',
          params: { allowedValues: schema31.properties.registerType.enum },
          message: 'must be equal to one of the allowed values',
        };
        if (vErrors === null) {
          vErrors = [err40];
        } else {
          vErrors.push(err40);
        }
        errors++;
      }
    }
    if (data.registrationScope !== undefined) {
      let data21 = data.registrationScope;
      if (Array.isArray(data21)) {
        const len6 = data21.length;
        for (let i6 = 0; i6 < len6; i6++) {
          let data22 = data21[i6];
          if (typeof data22 === 'string') {
            if (!formats0(data22)) {
              const err41 = {
                instancePath: instancePath + '/registrationScope/' + i6,
                schemaPath: '#/properties/registrationScope/items/format',
                keyword: 'format',
                params: { format: 'uri' },
                message: 'must match format "' + 'uri' + '"',
              };
              if (vErrors === null) {
                vErrors = [err41];
              } else {
                vErrors.push(err41);
              }
              errors++;
            }
          } else {
            const err42 = {
              instancePath: instancePath + '/registrationScope/' + i6,
              schemaPath: '#/properties/registrationScope/items/type',
              keyword: 'type',
              params: { type: 'string' },
              message: 'must be string',
            };
            if (vErrors === null) {
              vErrors = [err42];
            } else {
              vErrors.push(err42);
            }
            errors++;
          }
        }
      } else {
        const err43 = {
          instancePath: instancePath + '/registrationScope',
          schemaPath: '#/properties/registrationScope/type',
          keyword: 'type',
          params: { type: 'array' },
          message: 'must be array',
        };
        if (vErrors === null) {
          vErrors = [err43];
        } else {
          vErrors.push(err43);
        }
        errors++;
      }
    }
  } else {
    const err44 = {
      instancePath,
      schemaPath: '#/type',
      keyword: 'type',
      params: { type: 'object' },
      message: 'must be object',
    };
    if (vErrors === null) {
      vErrors = [err44];
    } else {
      vErrors.push(err44);
    }
    errors++;
  }
  validate20.errors = vErrors;
  return errors === 0;
}
validate20.evaluated = { props: true, dynamicProps: false, dynamicItems: false };
