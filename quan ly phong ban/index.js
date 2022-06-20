const data = [
  { id: 999999, name: 'Phòng to nhất', parentId: null },
  { id: 1, name: 'GHTK', parentId: 999999 },
  { id: 11, name: 'Phòng CNTT', parentId: 1 },
  { id: 111, name: 'Nhóm 1', parentId: 11 },
  { id: 112, name: 'Nhóm 2', parentId: 11 },
  { id: 12, name: 'Phòng KT', parentId: 1 },
  { id: 121, name: 'Nhóm 1', parentId: 12 },
  { id: 122, name: 'Nhóm 2', parentId: 12 },
  { id: 2, name: 'FPT', parentId: 999999 },
  { id: 21, name: 'Phòng Giám sát FPT', parentId: 2 },
  { id: 211, name: 'Nhóm 1', parentId: 21 },
  { id: 212, name: 'Nhóm 2', parentId: 21 },
  { id: 22, name: 'Phòng Pháp chế', parentId: 2 },
  { id: 221, name: 'Nhóm 1', parentId: 22 },
  { id: 222, name: 'Nhóm 2', parentId: 22 },
  { id: 3, name: 'VNPAY', parentId: 999999 },
  { id: 31, name: 'Phòng GTGT', parentId: 3 },
  { id: 311, name: 'Nhóm 1', parentId: 31 },
  { id: 312, name: 'Nhóm 2', parentId: 31 },
  { id: 32, name: 'Phòng Vận hành', parentId: 3 },
  { id: 321, name: 'Nhóm 1', parentId: 32 },
  { id: 322, name: 'Nhóm 2', parentId: 32 },
];

// Chuyển data sang dạng sau
const newData = {
  id: 999999,
  name: 'Phòng to nhất',
  parentId: null,
  childrens: [
    {
      id: 1,
      name: 'GHTK',
      parentId: 999999,
      childrens: [
        {
          id: 11,
          name: 'Phòng CNTT',
          parentId: 1,
          childrens: [
            { id: 111, name: 'Nhóm 1', parentId: 11, childrens: [] },
            { id: 112, name: 'Nhóm 2', parentId: 11, childrens: [] },
          ],
        },
        {
          id: 12,
          name: 'Phòng KT',
          parentId: 1,
          childrens: [
            { id: 121, name: 'Nhóm 1', parentId: 12, childrens: [] },
            { id: 122, name: 'Nhóm 2', parentId: 12, childrens: [] },
          ],
        },
      ],
    },
    {
      id: 2,
      name: 'FPT',
      parentId: 999999,
      childrens: [
        {
          id: 21,
          name: 'Phòng Giám sát FPT',
          parentId: 2,
          childrens: [
            { id: 211, name: 'Nhóm 1', parentId: 21, childrens: [] },
            { id: 212, name: 'Nhóm 2', parentId: 21, childrens: [] },
          ],
        },
        {
          id: 22,
          name: 'Phòng Pháp chế',
          parentId: 2,
          childrens: [
            { id: 221, name: 'Nhóm 1', parentId: 22, childrens: [] },
            { id: 222, name: 'Nhóm 2', parentId: 22, childrens: [] },
          ],
        },
      ],
    },
    {
      id: 3,
      name: 'VNPAY',
      parentId: 999999,
      childrens: [
        {
          id: 31,
          name: 'Phòng GTGT',
          parentId: 3,
          childrens: [
            { id: 311, name: 'Nhóm 1', parentId: 31, childrens: [] },
            { id: 312, name: 'Nhóm 2', parentId: 31, childrens: [] },
          ],
        },
        {
          id: 32,
          name: 'Phòng Vận hành',
          parentId: 3,
          childrens: [
            { id: 321, name: 'Nhóm 1', parentId: 32, childrens: [] },
            { id: 322, name: 'Nhóm 2', parentId: 32, childrens: [] },
          ],
        },
      ],
    },
  ],
};

// ------------------------------------------------------------------------

// handle push item

const handlePushItem = (item, root) => {
  if (!root.childrens) root.childrens = [];

  if (root.id === item.parentId) return root.childrens.push(item);

  root.childrens.forEach((child) => handlePushItem(item, child));
};

// convert data

const result = data.reduce(
  (total, item) => {
    if (!item.parentId) return { ...total, ...item };

    handlePushItem(item, total);
    return total;
  },
  { id: null, name: '', parentId: null, childrens: [] }
);

// push new item

const my_obj = { id: 4, name: 'GGGG', parentId: 999999 };

handlePushItem(my_obj, result);

console.log(result);
