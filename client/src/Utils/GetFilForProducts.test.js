import {GetFilForProducts} from './GetFilForProducts';

it ("reads fil correct", () => {
    var res = GetFilForProducts();
    
    expect(res).count.toBe(4);
});
