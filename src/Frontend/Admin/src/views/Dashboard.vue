<template>
	<div class="content">
		<div class="section">
			<div class="section-tit">이용자 통계</div>
			<div class="tab-con">
				<div class="status text-center">
					<div class="status-card">
						<div class="tit">총 가입자 수</div>
						<div class="num">10,000</div>
					</div>
					<div class="status-card">
						<div class="tit">총 탈퇴자 수</div>
						<div class="num">89</div>
					</div>
					<div class="status-card">
						<div class="tit">총 설치 수</div>
						<div class="num">100</div>
					</div>
					<div class="status-card">
						<div class="tit">총 삭제 수</div>
						<div class="num">100</div>
					</div>
					<div class="vr"></div>
					<div class="status-card">
						<div class="tit">DAU</div>
						<div class="num">100</div>
					</div>
					<div class="status-card">
						<div class="tit">MAU</div>
						<div class="num">100</div>
					</div>
					<div class="status-card">
						<div class="tit">최근30일<br />안심거래리포트 발급건수</div>
						<div class="num">100</div>
					</div>
				</div>

				<div class="table-wrap">
					<table class="table">
						<tr>
							<th rowspan="2">날짜</th>
							<th colspan="2">가입자</th>
							<th colspan="2">안드로이드</th>
							<th colspan="2">ios</th>
							<th colspan="2">리포트 발급건수</th>
						</tr>
						<tr>
							<th>
								신규
								<div class="sort-btn">
									<button type="button" class="btn">▲</button>
									<button type="button" class="btn">▼</button>
								</div>
							</th>
							<th>
								탈퇴
								<div class="sort-btn">
									<button type="button" class="btn">▲</button>
									<button type="button" class="btn">▼</button>
								</div>
							</th>
							<th>
								설치
								<div class="sort-btn">
									<button type="button" class="btn">▲</button>
									<button type="button" class="btn">▼</button>
								</div>
							</th>
							<th>
								삭제
								<div class="sort-btn">
									<button type="button" class="btn">▲</button>
									<button type="button" class="btn">▼</button>
								</div>
							</th>
							<th>
								설치
								<div class="sort-btn">
									<button type="button" class="btn">▲</button>
									<button type="button" class="btn">▼</button>
								</div>
							</th>
							<th>
								삭제
								<div class="sort-btn">
									<button type="button" class="btn">▲</button>
									<button type="button" class="btn">▼</button>
								</div>
							</th>
							<th>안심거래리포트</th>
							<th>안심분양리포트</th>
						</tr>
						<tr>
							<td>2022-01-01</td>
							<td>10</td>
							<td>1</td>
							<td>10</td>
							<td>1</td>
							<td>10</td>
							<td>1</td>
							<td>100</td>
							<td>100</td>
						</tr>
					</table>
				</div>
			</div>
		</div>
		<div class="section">
			<div class="section-tit">가입·탈퇴·리포트 통계</div>
			<div class="status text-center">
				<div class="status-card">
					<div class="tit">가입</div>
					<div class="num">10,000</div>
				</div>
				<div class="status-card">
					<div class="tit">탈퇴</div>
					<div class="num">89</div>
				</div>
				<div class="status-card">
					<div class="tit">리포트</div>
					<div class="num">100</div>
				</div>
			</div>
			<LineChartFill :chartData="lineChartFillData"></LineChartFill>
		</div>
		<div class="section">
			<div class="section-tit">안심거래리포트 발급 경로</div>
			<LineChartFill :chartData="lineChartFillData2"></LineChartFill>
		</div>
	</div>
</template>

<script>
import LineChartFill from '../components/chart/LineChartFill.vue';

export default {
	name: 'Dashboard',
	components: { LineChartFill },
	data() {
		return {
			lineChartFillData: {
				labels: [
					'2022.10.11',
					'2022.10.12',
					'2022.10.13',
					'2022.10.14',
					'2022.10.15',
					'2022.10.16',
					'2022.10.17',
					'2022.10.18',
				],
				datasets: [
					{
						fill: true,
						label: '가입',
						data: [40, 39, 10, 40, 39, 80, 40, 90],
					},
					{
						fill: true,
						label: '탈퇴',
						data: [1, 50, 70, 40, 39, 20, 10, 77],
					},
					{
						fill: true,
						label: '리포트',
						data: [9, 70, 10, 50, 69, 40, 15, 22],
					},
				],
			},
			lineChartFillData2: {
				labels: [
					'2022.10.11',
					'2022.10.12',
					'2022.10.13',
					'2022.10.14',
					'2022.10.15',
					'2022.10.16',
					'2022.10.17',
					'2022.10.18',
				],
				datasets: [
					{
						fill: true,
						label: '메인화면 상단',
						data: [40, 39, 10, 40, 39, 80, 40, 90],
					},
					{
						fill: true,
						label: '메인페이지 설명',
						data: [1, 50, 70, 40, 39, 20, 10, 77],
					},
					{
						fill: true,
						label: '유어픽 안심서비스',
						data: [9, 70, 10, 50, 69, 40, 15, 22],
					},
				],
			},
		};
	},
	created() {
		console.log('asdsa');
	},
	computed: {},
	methods: {},
};
</script>

<style></style>
