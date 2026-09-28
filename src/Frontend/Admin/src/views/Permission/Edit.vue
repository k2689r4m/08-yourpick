<template>
	<div class="content">
		<div class="section">
			<div class="section-tit">직원상세정보</div>
			<div class="row">
				<div class="col-6">
					<div class="section-tit sub">기본정보</div>
					<div class="table-wrap">
						<table class="table type-input">
							<colgroup>
								<col width="250px" />
								<col width="auto" />
							</colgroup>
							<tr>
								<th>계정</th>
								<td>
									<input type="text" class="form-control xsm m-r--1" v-model="item.mem_id" disabled />
								</td>
							</tr>
							<tr>
								<th>이름</th>
								<td>
									<input type="text" class="form-control xsm m-r--1" v-model="item.mem_name" disabled />
								</td>
							</tr>

							<tr>
								<th>비밀번호</th>
								<td>
									<input type="password" class="form-control xsm" v-model="item.password" placeholder="비밀번호 입력" />
									<input type="password" class="form-control xsm" v-model="password" placeholder="비밀번호 확인" />
									<label class="input-checkbox">
										<input type="checkbox" v-model="item.pwMode" />
										<span class="checkbox"></span>

										<span class="text">변경</span>
									</label>
								</td>
							</tr>
						</table>
					</div>
					<br /><br />
					<div class="section-tit sub">권한 범위</div>
					<label class="input-checkbox">
						<input type="checkbox" v-model="allST" @change="allCheck" />
						<span class="checkbox"></span>
						<span class="text">전 범위</span>
					</label>
					<br />
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

					<br />
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
			</div>
			<div class="btn-wrap">
				<button type="button" class="btn btn-md btn-secondary" @click="$btnOnRouterBack()">취소</button>
				<button type="button" class="btn btn-md btn-primary" @click="btnOnDel">삭제</button>
				<button type="button" class="btn btn-md btn-primary" @click="btnOnAdd">저장</button>
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
				pwMode: false,
			},
			password: '',
			allST: false,
			idCheckST: false,
		};
	},
	created() {
		this.getItem();
	},
	computed: {},
	methods: {
		getItem() {
			this.$apiGET('/admin/admin/item?id=' + this.$route.params.id).then(re => {
				this.item = re;
			});
		},
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
		btnOnAdd() {
			if (this.item.pwMode) {
				if (!this.item.password) {
					alert('비밀번호를 입력해 주세요.');
					return;
				}
				if (this.item.password != this.password) {
					alert('비밀번호가 일치하지 않습니다.');
					return;
				}
			}

			this.$apiPOST('/admin/admin/edit', this.item).then(() => {
				this.$btnOnRouterBack();
			});
		},
		btnOnDel() {
			if (!confirm('정말로 삭제하시겠습니까?')) {
				return;
			}

			this.$apiPOST('/admin/admin/del', { id: this.$route.params.id }).then(() => {
				this.$btnOnRouterBack();
			});
		},
	},
};
</script>

<style></style>
