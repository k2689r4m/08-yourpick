<template>
	<div class="content">
		<div class="section">
			<div class="section-tit">매출 관리</div>
			<div class="tab-con">
				<div class="table-top">
					<div class="left">
						<div class="tit">매출 요약</div>
					</div>
				</div>
				<div class="table-text">
					<table class="table">
						<colgroup>
							<col width="25%" />
							<col width="25%" />
							<col width="25%" />
							<col width="25%" />
						</colgroup>
						<tr>
							<th>오늘 매출 현황</th>
							<td>390,000원</td>
							<th>이달 매출 현황</th>
							<td>13,000,000원</td>
						</tr>
					</table>
				</div>
				<div class="table-top">
					<div class="left">
						<div class="tit">매출 통계</div>
					</div>
				</div>
				<div class="tab-btn">
					<button type="button" class="btn tab" v-bind:class="{ active: tab }" @click="tab = true">매출상세</button>
					<button type="button" class="btn tab" v-bind:class="{ active: !tab }" @click="tab = false">매출요약</button>
				</div>
				<div class="tab-con" v-if="tab">
					<div class="search-top">
						<div class="left">
							<input type="date" class="form-control sm" />
							<div class="search-top--text">~</div>
							<input type="date" class="form-control sm m-r--1" />
						</div>
						<div class="right">
							<button type="button" class="btn btn-sm btn-secondary">엑셀다운</button>
							<button type="button" class="btn btn-sm btn-primary">검색</button>
						</div>
					</div>
					<div class="table-top">
						<div class="left"></div>
						<div class="right">
							<select class="form-select">
								<option>서비스 종류</option>
							</select>
							<select class="form-select">
								<option>서비스 상세</option>
							</select>
						</div>
					</div>
					<div class="table-wrap">
						<table class="table">
							<tr>
								<th>No</th>
								<th>이름</th>
								<th>이메일</th>
								<th>휴대폰번호</th>
								<th>서비스종류</th>
								<th>서비스상세</th>
								<th>이용료</th>
								<th>결제금액</th>
								<th>결제방법</th>
								<th>결제일</th>
								<th>회원유형</th>
							</tr>
							<tr>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
							</tr>
						</table>
					</div>
				</div>
				<div class="tab-con" v-if="!tab">
					<div class="search-top">
						<div class="left">
							<input type="date" class="form-control sm" />
							<div class="search-top--text">~</div>
							<input type="date" class="form-control sm m-r--1" />
						</div>
						<div class="right">
							<button type="button" class="btn btn-sm btn-secondary">엑셀다운</button>
							<button type="button" class="btn btn-sm btn-primary">검색</button>
						</div>
					</div>
					<div class="table-wrap">
						<table class="table">
							<tr>
								<th rowspan="2">날짜</th>
								<th colspan="2">일반결제</th>
								<th colspan="4">간편결제</th>
								<th rowspan="2">소계</th>
							</tr>
							<tr>
								<th>카드</th>
								<th>무통장</th>
								<th>네이버페이</th>
								<th>카카오페이</th>
								<th>페이크</th>
								<th>토스</th>
							</tr>
							<tr>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td>
									<span class="text-danger">1,000</span>
								</td>
							</tr>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'MainUser',
	components: {},
	data() {
		return {
			tab: true,
		};
	},
	created() {},
	computed: {},
	methods: {},
};
</script>

<style></style>
