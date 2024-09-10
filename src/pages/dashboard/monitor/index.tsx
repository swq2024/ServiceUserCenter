import { FC } from 'react';
import { GridContent } from '@ant-design/pro-components';
import { Card, Col, Progress, Row, Statistic } from 'antd';
import numeral from 'numeral';
import dayjs from 'dayjs';
import Duration from 'dayjs/plugin/duration';
import { Gauge, WordCloud, Liquid } from '@ant-design/plots';
import ActiveChart from './components/ActiveChart';
import useStyles from './style.style';
import Map from './components/Map';
import { useRequest } from '@umijs/max';
import { queryTags } from './service';

dayjs.extend(Duration);

const leftColResponsiveProps = {
  xl: 18,
  lg: 24,
  md: 24,
  sm: 24,
  xs: 24,
  style: {
    marginBottom: 24,
  },
};
const rightColResponsiveProps = {
  xl: 6,
  lg: 24,
  md: 24,
  sm: 24,
  xs: 24,
};
const dealColResponsiveProps = {
  md: 6,
  sm: 12,
  xs: 24,
};
const categoryColResponsiveProps = {
  xl: 12,
  lg: 24,
  sm: 24,
  xs: 24,
  style: {
    marginBottom: 24,
  },
};
const searchAndResourceColResponsiveProps = {
  xl: 6,
  lg: 24,
  sm: 24,
  xs: 24,
  style: {
    marginBottom: 24,
  },
};

const deadline =
  new Date().getTime() + dayjs.duration(60 * 60 * 1000 * 48 + 1000 * 30).asMilliseconds(); // Moment is also OK

const { Countdown } = Statistic;
const Monitor: FC = () => {
  const { styles } = useStyles();
  const { loading, data } = useRequest(queryTags);
  const wordCloudData = (data?.list || []).map((item) => {
    return {
      id: +Date.now(),
      word: item.name,
      weight: item.value,
    };
  });
  return (
    <GridContent>
      <>
        <Row gutter={24}>
          <Col {...leftColResponsiveProps}>
            <Card title="活动实时交易情况" bordered={false}>
              <Row>
                <Col {...dealColResponsiveProps}>
                  <Statistic
                    title="今日交易总额"
                    suffix="元"
                    value={numeral(123456633).format('0,0')}
                  />
                </Col>
                <Col {...dealColResponsiveProps}>
                  <Statistic title="销售目标完成率" value="92%" />
                </Col>
                <Col {...dealColResponsiveProps}>
                  <Countdown title="活动剩余时间" value={deadline} format="HH:mm:ss:SSS" />
                </Col>
                <Col {...dealColResponsiveProps}>
                  <Statistic title="每秒交易总额" suffix="元" value={numeral(234).format('0,0')} />
                </Col>
              </Row>
              <div className={styles.mapChart}>
                <Map />
              </div>
            </Card>
          </Col>

          <Col {...rightColResponsiveProps}>
            <Card
              title="活动情况预测"
              style={{
                marginBottom: 24,
              }}
              bordered={false}
            >
              <ActiveChart />
            </Card>
            <Card
              title="券核效率"
              style={{
                marginBottom: 24,
              }}
              bodyStyle={{
                textAlign: 'center',
              }}
              bordered={false}
            >
              <Gauge
                height={180}
                data={
                  {
                    target: 80,
                    total: 100,
                    name: 'score',
                    thresholds: [20, 40, 60, 80, 100],
                  } as any
                }
                padding={-16}
                style={{
                  textContent: () => '优',
                }}
                meta={{
                  color: {
                    range: ['#6395FA', '#62DAAB', '#657798', '#F7C128', '#1F8718'],
                  },
                }}
              />
            </Card>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col {...categoryColResponsiveProps}>
            <Card title="各品类占比" bordered={false}>
              <Row
                style={{
                  padding: '20px 0',
                }}
              >
                <Col span={8}>
                  <Progress type="dashboard" percent={33} />
                </Col>
                <Col span={8}>
                  <Progress type="dashboard" percent={66} />
                </Col>
                <Col span={8}>
                  <Progress type="dashboard" percent={99} />
                </Col>
              </Row>
            </Card>
          </Col>
          <Col {...searchAndResourceColResponsiveProps}>
            <Card
              title="热门搜索"
              loading={loading}
              bordered={false}
              bodyStyle={{
                overflow: 'hidden',
              }}
            >
              <WordCloud
                data={wordCloudData}
                height={160}
                textField="word"
                colorField="word"
                layout={{ spiral: 'rectangular', fontSize: [10, 20] }}
              />
            </Card>
          </Col>
          <Col {...searchAndResourceColResponsiveProps}>
            <Card
              title="资源剩余"
              bodyStyle={{
                textAlign: 'center',
                fontSize: 0,
              }}
              bordered={false}
            >
              <Liquid height={160} percent={0.45} />
            </Card>
          </Col>
        </Row>
      </>
    </GridContent>
  );
};

export default Monitor;
