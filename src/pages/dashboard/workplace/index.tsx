import { PageContainer } from '@ant-design/pro-components';
import { Link, useRequest } from '@umijs/max';
import { Avatar, Card, Col, List, Row, Skeleton, Statistic } from 'antd';
import type { FC } from 'react';
import { ActivitiesType, CurrentUser } from './data';
import useStyles from './style.style';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'; // 相对时间插件?
import EditableLinkGroup from './components/EditableLinkGroup';
import { Radar } from '@ant-design/plots';
import { fakeChartData, queryActivities, queryProjectNotice } from './service';
// 引用插件
dayjs.extend(relativeTime);

const links = [
  {
    title: '操作一',
    href: '',
  },
  {
    title: '操作二',
    href: '',
  },
  {
    title: '操作三',
    href: '',
  },
  {
    title: '操作四',
    href: '',
  },
  {
    title: '操作五',
    href: '',
  },
  {
    title: '操作六',
    href: '',
  },
];
const PageHeaderContent: FC<{
  currentUser: Partial<CurrentUser>;
}> = ({ currentUser }) => {
  const { styles } = useStyles();
  const loading = currentUser && Object.keys(currentUser).length;
  if (!loading) {
    return (
      <Skeleton
        avatar
        paragraph={{
          rows: 1,
        }}
        active
      />
    );
  }
  return (
    <div className={styles.pageHeaderContent}>
      <div className={styles.avatar}>
        <Avatar size="large" src={currentUser.avatar} />
      </div>
      <div className={styles.content}>
        <div className={styles.contentTitle}>
          早安，
          {currentUser.name}
          ，祝你开心每一天！
        </div>
        <div>
          {currentUser.title} |{currentUser.group}
        </div>
      </div>
    </div>
  );
};
const ExtraContent: FC<Record<string, any>> = () => {
  const { styles } = useStyles();
  return (
    <div className={styles.extraContent}>
      <div className={styles.statItem}>
        <Statistic title="项目数" value={56} />
      </div>
      <div className={styles.statItem}>
        <Statistic title="团队内排名" value={8} suffix="/ 24" />
      </div>
      <div className={styles.statItem}>
        <Statistic title="项目访问" value={2224} />
      </div>
    </div>
  );
};
// 应是后端返回的数据，这里用静态数据模拟
// const projectNotice: NoticeType[] = [
//   {
//     description: '那是一种内在的东西，他们到达不了，也无法触及的',
//     href: '',
//     id: 'xxx1',
//     logo: 'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png',
//     member: '科学搬砖组',
//     memberLink: '',
//     title: 'Alipay',
//     updatedAt: '2024-09-07T02:07:02.002Z',
//   },
//   {
//     description: '希望是一个好东西，也许是最好的，好东西是不会消亡的',
//     href: '',
//     id: 'xxx2',
//     logo: 'https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png',
//     member: '全组都是吴彦祖',
//     memberLink: '',
//     title: 'Angular',
//     updatedAt: '2017-07-24T00:00:00.000Z',
//   },
//   {
//     description: '城镇中有那么多的酒馆，她却偏偏走进了我的酒馆',
//     href: '',
//     id: 'xxx3',
//     logo: 'https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png',
//     member: '中二少女团',
//     memberLink: '',
//     title: 'Ant Design',
//     updatedAt: '2024-09-07T02:07:02.002Z',
//   },
//   {
//     description: '那时候我只会想自己想要什么，从不想自己拥有什么',
//     href: '',
//     id: 'xxx4',
//     logo: 'https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png',
//     member: '程序员日常',
//     memberLink: '',
//     title: 'Ant Design Pro',
//     updatedAt: '2017-07-23T00:00:00.000Z',
//   },
//   {
//     description: '凛冬将至',
//     href: '',
//     id: 'xxx5',
//     logo: 'https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png',
//     member: '高逼格设计天团',
//     memberLink: '',
//     title: 'Bootstrap',
//     updatedAt: '2017-07-23T00:00:00.000Z',
//   },
//   {
//     description: '生命就像一盒巧克力，结果往往出人意料',
//     href: '',
//     id: 'xxx6',
//     logo: 'https://gw.alipayobjects.com/zos/rmsportal/kZzEzemZyKLKFsojXItE.png',
//     member: '骗你来学计算机',
//     memberLink: '',
//     title: 'React',
//     updatedAt: '2017-07-23T00:00:00.000Z',
//   },
// ];
// const activitiesData: ActivitiesType[] = [
//   {
//     group: {
//       link: 'http://github.com/',
//       name: '高逼格设计天团',
//     },
//     id: 'trend-1',
//     project: { name: '六月迭代', link: 'http://github.com/' },
//     template: '在 @{group} 新建项目 @{project}',
//     updatedAt: '2024-09-07T02:07:02.258Z',
//     user: {
//       name: '曲丽丽',
//       avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
//     },
//   },
//   {
//     group: {
//       link: 'http://github.com/',
//       name: '高逼格设计天团',
//     },
//     id: 'trend-1',
//     project: { name: '六月迭代', link: 'http://github.com/' },
//     template: '在 @{group} 新建项目 @{project}',
//     updatedAt: '2024-09-07T02:07:02.258Z',
//     user: {
//       name: '曲丽丽',
//       avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
//     },
//   },
//   {
//     group: {
//       link: 'http://github.com/',
//       name: '高逼格设计天团',
//     },
//     id: 'trend-1',
//     project: { name: '六月迭代', link: 'http://github.com/' },
//     template: '在 @{group} 新建项目 @{project}',
//     updatedAt: '2024-09-07T02:07:02.258Z',
//     user: {
//       name: '曲丽丽',
//       avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
//     },
//   },
//   {
//     group: {
//       link: 'http://github.com/',
//       name: '高逼格设计天团',
//     },
//     id: 'trend-1',
//     project: { name: '六月迭代', link: 'http://github.com/' },
//     template: '在 @{group} 新建项目 @{project}',
//     updatedAt: '2024-09-07T02:07:02.258Z',
//     user: {
//       name: '曲丽丽',
//       avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
//     },
//   },
//   {
//     group: {
//       link: 'http://github.com/',
//       name: '高逼格设计天团',
//     },
//     id: 'trend-1',
//     project: { name: '六月迭代', link: 'http://github.com/' },
//     template: '在 @{group} 新建项目 @{project}',
//     updatedAt: '2024-09-07T02:07:02.258Z',
//     user: {
//       name: '曲丽丽',
//       avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
//     },
//   },
//   {
//     group: {
//       link: 'http://github.com/',
//       name: '高逼格设计天团',
//     },
//     id: 'trend-1',
//     project: { name: '六月迭代', link: 'http://github.com/' },
//     template: '在 @{group} 新建项目 @{project}',
//     updatedAt: '2024-09-07T02:07:02.258Z',
//     user: {
//       name: '曲丽丽',
//       avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
//     },
//   },
// ];
// const radarData: DataItem[] = [
//   {
//     label: '引用',
//     name: '个人',
//     value: 8,
//   },
//   {
//     label: '口碑',
//     name: '个人',
//     value: 6,
//   },
//   {
//     label: '产量',
//     name: '个人',
//     value: 4,
//   },
//   {
//     label: '贡献',
//     name: '个人',
//     value: 5,
//   },
//   {
//     label: '热度',
//     name: '个人',
//     value: 7,
//   },
//   {
//     label: '引用',
//     name: '团队',
//     value: 8,
//   },
//   {
//     label: '口碑',
//     name: '团队',
//     value: 6,
//   },
//   {
//     label: '产量',
//     name: '团队',
//     value: 3,
//   },
//   {
//     label: '贡献',
//     name: '团队',
//     value: 1,
//   },
//   {
//     label: '热度',
//     name: '团队',
//     value: 4,
//   },
//   {
//     label: '引用',
//     name: '部门',
//     value: 4,
//   },
//   {
//     label: '口碑',
//     name: '部门',
//     value: 1,
//   },
//   {
//     label: '产量',
//     name: '部门',
//     value: 6,
//   },
//   {
//     label: '贡献',
//     name: '部门',
//     value: 5,
//   },
//   {
//     label: '热度',
//     name: '部门',
//     value: 7,
//   },
// ];
const Workplace: FC = () => {
  const { styles } = useStyles();
  const {loading: projectLoading ,data:projectNotice = []} = useRequest(queryProjectNotice) // queryProjectNotice 后端接口方法
  const {loading: activeLoading,data:activitiesData = []} = useRequest(queryActivities) // queryProjectNotice 后端接口方法
  const { data } = useRequest(fakeChartData); // fakeChartData 后端接口方法 在service.ts 中定义
  const renderActivities = (item: ActivitiesType) => {
    const events = item.template.split(/@\{([^{}]*)\}/gi).map((key) => {
      if (item[key as keyof ActivitiesType]) {
        const value = item[key as 'user'];
        return (
          <a href={value?.link} key={value?.name}>
            {value.name}
          </a>
        );
      }
      return key;
    });
    return (
      <List.Item key={item.id}>
        <List.Item.Meta
          avatar={<Avatar src={item.user.avatar} />}
          title={
            <span>
              <a className={styles.username}>{item.user.name}</a>
              &nbsp;
              <span className={styles.event}>{events}</span>
            </span>
          }
          description={
            <span className={styles.datetime} title={item.updatedAt}>
              {dayjs(item.updatedAt).fromNow()}
            </span>
          }
        />
      </List.Item>
    );
  };
  return (
    <PageContainer
      content={
        <PageHeaderContent
          currentUser={{
            avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
            name: '吴彦祖',
            userid: '00000001',
            email: 'antdesign@alipay.com',
            signature: '海纳百川，有容乃大',
            title: '交互专家',
            group: '蚂蚁金服－某某某事业群－某某平台部－某某技术部－UED',
          }}
        />
      }
      extraContent={<ExtraContent />}
    >
      <Row gutter={24}>
        <Col xl={16} lg={24} md={24} sm={24} xs={24}>
          <Card
            className={styles.projectList}
            style={{
              marginBottom: 24,
            }}
            title="进行中的项目"
            bordered={false}
            extra={<Link to="/">全部项目</Link>}
            loading={projectLoading}
            bodyStyle={{
              padding: 0,
            }}
          >
            {projectNotice.map((item) => (
              <Card.Grid className={styles.projectGrid} key={item.id}>
                <Card
                  bodyStyle={{
                    padding: 0,
                  }}
                  bordered={false}
                >
                  <Card.Meta
                    title={
                      <div className={styles.cardTitle}>
                        <Avatar size="small" src={item.logo} />
                        <Link to={item.href || '/'}>{item.title}</Link>
                      </div>
                    }
                    description={item.description}
                  />
                  <div className={styles.projectItemContent}>
                    <Link to={item.memberLink || '/'}>{item.member || ''}</Link>
                    {item.updatedAt && (
                      <span className={styles.datetime} title={item.updatedAt}>
                        {dayjs(item.updatedAt).fromNow()}
                      </span>
                    )}
                  </div>
                </Card>
              </Card.Grid>
            ))}
          </Card>
          <Card
            bodyStyle={{
              padding: 0,
            }}
            bordered={false}
            className={styles.activeCard}
            title="动态"
            loading={activeLoading}
          >
            <List<ActivitiesType>
              // loading={activitiesLoading}
              renderItem={(item) => renderActivities(item)}
              dataSource={activitiesData}
              className={styles.activitiesList}
              size="large"
            />
          </Card>
        </Col>
        <Col xl={8} lg={24} md={24} sm={24} xs={24}>
          {/* 待办事项 */}
          <Card
            style={{
              marginBottom: 24,
            }}
            title="快速开始 / 待办事项"
            bordered={false}
            bodyStyle={{
              padding: 0,
            }}
          >
            <EditableLinkGroup onAdd={() => {}} links={links} linkElement={Link} />
          </Card>
          {/* 雷达图示例 */}
          <Card
            style={{
              marginBottom: 24,
            }}
            bordered={false}
            title="XX 指数"
            loading={data?.radarData?.length === 0}
          >
            <div>
              <Radar
                height={343}
                data={data?.radarData || []}
                xField="label"
                colorField="name"
                yField="value"
                shapeField="smooth"
                area={{
                  style: {
                    fillOpacity: 0.4,
                  },
                }}
                axis={{
                  y: {
                    gridStrokeOpacity: 0.5,
                  },
                }}
                legend={{
                  color: {
                    position: 'bottom',
                    layout: { justifyContent: 'center' },
                  },
                }}
              />
            </div>
          </Card>
          {/* 精灵图示例 */}
          <Card
            bodyStyle={{
              paddingTop: 12,
              paddingBottom: 12,
            }}
            bordered={false}
            title="团队"
            // loading={projectLoading}
          >
            <div className={styles.members}>
              <Row gutter={48}>
                {projectNotice.map((item) => {
                  return (
                    <Col span={12} key={`members-item-${item.id}`}>
                      <a>
                        <Avatar src={item.logo} size="small" />
                        <span className={styles.member}>{item.member.substring(0, 3)}</span>
                      </a>
                    </Col>
                  );
                })}
              </Row>
            </div>
          </Card>
        </Col>
      </Row>
    </PageContainer>
  );
};

export default Workplace;
