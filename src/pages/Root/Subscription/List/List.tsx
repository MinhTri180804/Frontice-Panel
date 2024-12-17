import { useQuery } from '@tanstack/react-query';
import { List } from 'antd';
import constantRootQueryKeys from '../../../../constants/queryKey/root';
import rootService from '../../../../service/Root/RootService';
import { ISubscriptionEntity } from '../../../../types/entity/subscription';
import { ItemSubscription } from './Partials/ItemSubscription';

const SubscriptionListPage = () => {
  const { data, isFetching } = useQuery({
    queryKey: [constantRootQueryKeys.subscription.getAllSubscription],
    queryFn: async () => {
      try {
        const response = await rootService.subscription.getAllSubscription();
        const responseData = response.data;
        return responseData;
      } catch (error) {
        console.log('error: ', error);
      }
    },
  });
  return (
    <List<ISubscriptionEntity>
      loading={isFetching}
      grid={{ gutter: 16, column: 1 }}
      dataSource={data?.services[0]}
      renderItem={(subscription) => (
        <ItemSubscription subscriptionData={subscription} />
      )}
    />
  );
};

export default SubscriptionListPage;
