import { act, renderHook } from '@testing-library/react-hooks';

import { createWrapper } from '../../../../utils/test';
import { useStaff } from '../useStaff';

test('filter staff', async () => {
  const { result, waitFor } = renderHook(() => useStaff(), {
    wrapper: createWrapper(),
  });

  // to get your bearings
  // console.log(result);

  // wait for the staff to populate
  await waitFor(() => result.current.staff.length === 4);

  // set to filter for only staff who give massage
  act(() => result.current.setFilter('massage'));

  // wait for the staff list to display only 3
  await waitFor(() => result.current.staff.length === 3);
});
