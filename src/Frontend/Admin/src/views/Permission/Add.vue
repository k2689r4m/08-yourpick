<template>
	<div class="content">
		<div class="section">
			<div class="section-tit">관리자 계정 관리</div>
			<div class="col-7">
				<div class="section-tit sub">기본정보</div>
				<div class="table-text">
					<table class="table">
						<colgroup>
							<col width="20%" />
							<col width="80%" />
						</colgroup>
						<tr>
							<th>계정</th>
							<td>
								<div class="input-wrap">
									<input type="text" class="form-control" v-model="item.mem_id" :disabled="idCheckST" />
									<button class="btn btn-xsm btn-light" @click="btnOnCheck" :disabled="idCheckST">중복확인</button>
								</div>
							</td>
						</tr>
						<tr>
							<th>이름</th>
							<td>
								<input type="text" class="form-control" v-model="item.mem_name" />
							</td>
						</tr>
						<tr>
							<th>비밀번호</th>
							<td>
								<input type="password" class="form-control" v-model="item.password" placeholder="비밀번호 입력" />
							</td>
						</tr>
						<tr>
							<th>비밀번호확인</th>
							<td>
								<input type="password" class="form-control" v-model="password" placeholder="비밀번호 확인" />
							</td>
						</tr>
					</table>
				</div>
				<div class="table-top">
					<div class="left">
						<div class="tit">권한 범위</div>
					</div>
				</div>
				<div class="table-text">
					<table class="table">
						<tr>
							<td>
								<div class="input-wrap">
									<label class="input-checkbox">
										<input type="checkbox" v-model="allST" @change="allCheck" />
										<span class="checkbox"></span>
										<span class="text">전 범위</span>
									</label>
								</div>
								<div class="input-wrap mt-2">
									<label class="input-checkbox">
										<input type="checkbox" true-value="Y" false-value="N" v-model="item.dashboard" />
										<span class="checkbox"></span>
										<span class="text">대시보드</span>
									</label>
									<label class="input-checkbox">
										<input type="checkbox" true-value="Y" false-value="N" v-model="item.user" />
										<span class="checkbox"></span>
										<span class="text">회원관리</span>
									</label>
									<label class="input-checkbox">
										<input type="checkbox" true-value="Y" false-value="N" v-model="item.statistics" />
										<span class="checkbox"></span>
										<span class="text">통계</span>
									</label>
									<label class="input-checkbox">
										<input type="checkbox" true-value="Y" false-value="N" v-model="item.report" />
										<span class="checkbox"></span>
										<span class="text">리포트관리</span>
									</label>
									<label class="input-checkbox">
										<input type="checkbox" true-value="Y" false-value="N" v-model="item.contents" />
										<span class="checkbox"></span>
										<span class="text">콘텐츠관리</span>
									</label>
									<label class="input-checkbox">
										<input type="checkbox" true-value="Y" false-value="N" v-model="item.ticket" />
										<span class="checkbox"></span>
										<span class="text">이용권관리</span>
									</label>
								</div>
								<div class="input-wrap mt-2">
									<label class="input-checkbox">
										<input type="checkbox" true-value="Y" false-value="N" v-model="item.inquiry" />
										<span class="checkbox"></span>
										<span class="text">문의관리</span>
									</label>
									<label class="input-checkbox">
										<input type="checkbox" true-value="Y" false-value="N" v-model="item.pay" />
										<span class="checkbox"></span>
										<span class="text">결제관리</span>
									</label>
									<label class="input-checkbox">
										<input type="checkbox" true-value="Y" false-value="N" v-model="item.sales" />
										<span class="checkbox"></span>
										<span class="text">매출관리</span>
									</label>
									<label class="input-checkbox">
										<input type="checkbox" true-value="Y" false-value="N" v-model="item.permission" />
										<span class="checkbox"></span>
										<span class="text">권한관리</span>
									</label>
									<label class="input-checkbox">
										<input type="checkbox" true-value="Y" false-value="N" v-model="item.CS" />
										<span class="checkbox"></span>
										<span class="text">고객센터</span>
									</label>
								</div>
							</td>
						</tr>
					</table>
				</div>
			</div>
			<div class="btn-wrap mt-4">
				<button type="button" class="btn btn-sm btn-secondary" @click="$btnOnRouterBack()">취소</button>
				<button type="button" class="btn btn-sm btn-primary" @click="btnOnAdd">저장</button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'MainUser',
	data() {
		return {
			item: {
				mem_id: '',
				mem_name: '',
				password: '',

				dashboard: 'N',
				user: 'N',
				statistics: 'N',
				report: 'N',
				contents: 'N',
				ticket: 'N',
				inquiry: 'N',
				pay: 'N',
				sales: 'N',
				permission: 'N',
				CS: 'N',
			},
			password: '',
			allST: false,
			idCheckST: false,
		};
	},
	created() {},
	computed: {},
	methods: {
		allCheck() {
			if (this.allST) {
				this.item.dashboard = 'Y';
				this.item.user = 'Y';
				this.item.statistics = 'Y';
				this.item.report = 'Y';
				this.item.contents = 'Y';
				this.item.ticket = 'Y';
				this.item.inquiry = 'Y';
				this.item.pay = 'Y';
				this.item.sales = 'Y';
				this.item.permission = 'Y';
				this.item.CS = 'Y';
			} else {
				this.item.dashboard = 'N';
				this.item.user = 'N';
				this.item.statistics = 'N';
				this.item.report = 'N';
				this.item.contents = 'N';
				this.item.ticket = 'N';
				this.item.inquiry = 'N';
				this.item.pay = 'N';
				this.item.sales = 'N';
				this.item.permission = 'N';
				this.item.CS = 'N';
			}
		},
		btnOnCheck() {
			this.$apiPOST('/admin/admin/idck', { mem_id: this.item.mem_id }).then(re => {
				if (re) {
					this.idCheckST = true;
					alert('사용 가능한 계정입니다.');
				} else {
					alert('이미 사용된 계정입니다.');
				}
			});
		},
		btnOnAdd() {
			if (!this.item.mem_id) {
				alert('계정을 입력해 주세요.');
				return;
			}
			if (!this.idCheckST) {
				alert('중복체크를 해주세요.');
				return;
			}
			if (!this.item.mem_name) {
				alert('이름을 입력해 주세요.');
				return;
			}
			if (!this.item.password) {
				alert('비밀번호를 입력해 주세요.');
				return;
			}
			if (this.item.password != this.password) {
				alert('비밀번호가 일치하지 않습니다.');
				return;
			}

			this.$apiPOST('/admin/admin/add', this.item).then(() => {
				this.$btnOnRouterBack();
			});
		},
	},
};
</script>

<style></style>
