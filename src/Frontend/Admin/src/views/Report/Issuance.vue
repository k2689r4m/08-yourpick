<template>
	<div class="content">
		<div class="section">
			<div class="section-tit">리포트 대량 발급</div>
			<div class="tab-con">
				<div class="table-top">
					<div class="left"></div>
					<div class="right">
						<button type="button" class="btn btn-sm btn-secondary" @click="popup1 = true">엑셀업로드</button>
						<button type="button" class="btn btn-sm btn-secondary">엑셀다운</button>
					</div>
				</div>
				<div class="table-wrap">
					<table class="table">
						<tr>
							<th>번호</th>
							<th>항목</th>
							<th>주소</th>
							<th>수량</th>
							<th>메모</th>
							<th>진행상황</th>
							<th>확인</th>
						</tr>
						<tr>
							<td>1</td>
							<td>유오픽 빌라 100세대 확보</td>
							<td>서울 영등포구 유어픽 빌라</td>
							<td>100</td>
							<td>
								<span>32평 데이터 100세대</span>
								<!-- <input type="text" class="form-control sm m-r--1" /> -->
								<button type="button" class="btn btn-xsm btn-outline-secondary m-l--1">수정</button>
							</td>
							<td>발급완료</td>
							<td>
								<button type="button" class="btn btn-xsm btn-outline-secondary" @click="popup2 = true">확인하기</button>
							</td>
						</tr>
					</table>
				</div>
			</div>
		</div>
	</div>
	<div class="popup-wrap" v-if="popup1">
		<div class="dim"></div>
		<div class="popup">
			<div class="popup-tit">
				&nbsp;
				<button type="button" class="btn btn-close" @click="popup1 = false"></button>
			</div>
			<div class="popup-con">
				<table class="table">
					<tr>
						<th>항목명</th>
						<td>
							<input type="text" class="form-control" />
						</td>
					</tr>
					<tr>
						<th>수량</th>
						<td>
							<input type="text" class="form-control" />
						</td>
					</tr>
					<tr>
						<td colspan="2">
							<div class="input-wrap">
								<input type="text" class="form-control" readonly />
								<button type="button" class="btn btn-xsm btn-light">파일찾기</button>
							</div>
						</td>
					</tr>
				</table>
				<div class="btn-wrap">
					<button type="button" class="btn btn-sm btn-primary" @click="popup1 = false">발급하기</button>
				</div>
			</div>
		</div>
	</div>
	<div class="popup-wrap" v-if="popup2">
		<div class="dim"></div>
		<div class="popup">
			<div class="popup-tit">
				&nbsp;
				<button type="button" class="btn btn-close" @click="popup2 = false"></button>
			</div>
			<div class="popup-con">
				<div class="table-text">
					<table class="table">
						<tr>
							<td>서울 영등포구 유어픽 빌라</td>
							<td>완료</td>
						</tr>
						<tr>
							<td>서울 영등포구 유어픽 빌라</td>
							<td>완료</td>
						</tr>
					</table>
				</div>
				<div class="btn-wrap">
					<button type="button" class="btn btn-sm btn-primary" @click="popup2 = false">확인하기</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Approval',
	components: {},
	data() {
		return {
			popup1: false,
			popup2: false,
		};
	},
	created() {},
	computed: {},
	methods: {},
};
</script>

<style></style>
