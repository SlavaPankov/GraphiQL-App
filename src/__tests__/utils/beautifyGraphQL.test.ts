import { beautifyGraphQL } from '@utils/beautifyGraphQL';
import { describe, expect, it } from 'vitest';

describe.todo('beautifyGraphQL', () => {
  it('format basic query properly', () => {
    const basic =
      'query($v:String){characters(filter:{name:$v}){results{name}response{name}}}';
    const spaced =
      '   query   ($v   :   String   )   {   characters   (   filter   :   {   name   :   $v   }   )   {   results   {   name   }   response   {   name   }   }   }   ';
    const linebreaked =
      'query($v:String){characters(filter:{name:$v}){results{name}\n\n\nresponse{name}}}';

    const expected = `query ($v: String) {
      characters(filter: {name: $v}) {
        results {
          name
        }
        response {
          name
        }
      }
    }`;

    expect(beautifyGraphQL(basic)).toBe(expected);
    expect(beautifyGraphQL(spaced)).toBe(expected);
    expect(beautifyGraphQL(linebreaked)).toBe(expected);
  });

  it('format multiple property query properly', () => {
    const basic =
      'query($v:String){characters(filter:{name:$v}){results{name description}response{name}}}';
    const spaced =
      '   query   ($v   :   String   )   {   characters   (   filter   :   {   name   :   $v   }   )   {   results   {   name   description   }   response   {   name   }   }   }   ';
    const linebreaked =
      'query($v:String){characters(filter:{name:$v}){results{name\n\n\ndescription}\n\n\nresponse{name}}}';

    const expected = `query ($v: String) {
      characters(filter: {name: $v}) {
        results {
          name
          description
        }
        response {
          name
        }
      }
    }`;

    expect(beautifyGraphQL(basic)).toBe(expected);
    expect(beautifyGraphQL(spaced)).toBe(expected);
    expect(beautifyGraphQL(linebreaked)).toBe(expected);
  });
});
