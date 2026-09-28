<template>
	<div class="content">
		<div class="section">
			<div class="section-tit">이용권 발송 관리</div>
			<div class="tab-con">
				<!-- <div class="table-top">
					<div class="left">
						<div class="tit">신규 생성</div>
					</div>
					<div class="right">
						<button type="button" class="btn btn-sm btn-primary" @click="addItem">이용권 생성</button>
					</div>
				</div>
				<div class="table-text">
					<table class="table">
						<colgroup>
							<col width="10%" />
							<col width="15%" />
							<col width="10%" />
							<col width="15%" />
							<col width="10%" />
							<col width="15%" />
							<col width="10%" />
							<col width="15%" />
						</colgroup>
						<tr>
							<th>서비스</th>
							<td>안심거래리포트</td>
							<th>상세내용</th>
							<td>
								<input type="text" class="form-control" v-model="addItemInfo.info" />
							</td>
							<th>수량</th>
							<td>
								<input type="number" class="form-control" v-model="addItemInfo.cnt" />
							</td>
							<th>이용권명</th>
							<td>무료이용권</td>
						</tr>
					</table>
				</div> -->
				<div class="table-top">
					<div class="left">
						<div class="tit">이용권 발송 입력</div>
					</div>
				</div>
				<div class="table-text">
					<table class="table">
						<colgroup>
							<col width="10%" />
							<col width="15%" />
							<col width="10%" />
							<col width="15%" />
							<col width="10%" />
							<col width="15%" />
							<col width="10%" />
							<col width="15%" />
						</colgroup>
						<tr>
							<th>서비스</th>
							<td>
								<select class="form-select" v-model="ticketObj.name">
									<option value="">선택</option>
									<option value="안심거래리포트">안심거래리포트</option>
								</select>
							</td>
							<th>상세내용</th>
							<td>
								<input type="text" class="form-control" v-model="ticketObj.info" />
							</td>
							<th>발급번호</th>
							<td>
								<input type="text" class="form-control" />
							</td>
							<th>코드</th>
							<td>
								<input type="text" class="form-control" />
							</td>
						</tr>
						<tr>
							<th>제공범위</th>
							<td>
								<select class="form-select" v-model="ticketObj.grade">
									<option value="">선택</option>
									<option value="2">전체</option>
									<option value="1">일반</option>
									<option value="0">비즈니스</option>
								</select>
							</td>
							<th>사용제한</th>
							<td>
								<select class="form-select" v-model="ticketObj.cnt">
									<option value="">선택</option>
									<option value="1">1건</option>
									<option value="3">3건</option>
									<option value="5">5건</option>
									<option value="999999">제한없음</option>
								</select>
							</td>
							<th>사용기간</th>
							<td colspan="3">
								<input type="date" class="form-control sm" v-model="ticketObj.dateS" />
								~
								<input type="date" class="form-control sm" v-model="ticketObj.dateE" />
								<button type="button" class="btn btn-sm float-right btn-secondary" @click="saveTicket">
									이용권 생성
								</button>
							</td>
						</tr>
					</table>
				</div>
				<div class="table-top">
					<div class="left">
						<div class="tit">발송 회원 적용 값(총: 3,999명)</div>
					</div>
					<div class="right">
						<select class="form-select" v-model="isItem" @change="getMamberList">
							<option :value="{ id: '', grade: 2, cnt: '', dateS: '', dateE: '' }">선택</option>
							<option
								v-for="t in ticketList"
								:key="'ttlis_' + t.id"
								:value="{ id: t.id, grade: t.grade, cnt: t.cnt, dateS: t.dateS, dateE: t.dateE }"
							>
								{{ $GRADE_TYPE[t.grade] }} {{ t.info }}
							</option>
						</select>
						<button type="button" class="btn btn-sm btn-primary" @click="useTicket">이용권 발송</button>
					</div>
				</div>
				<div class="table-wrap">
					<table class="table">
						<tr>
							<th>
								<label class="input-checkbox">
									<input type="checkbox" v-model="allST" @change="allSelect" />
									<span class="checkbox"></span>
								</label>
							</th>
							<th>번호</th>
							<th>이름</th>
							<th>회원유형</th>
							<th>이메일</th>
							<th>가입일</th>
						</tr>
						<tr v-for="item in memberList" :key="'member_' + item.id">
							<td>
								<label class="input-checkbox">
									<input type="checkbox" v-model="item.st" />
									<span class="checkbox"></span>
								</label>
							</td>
							<td>{{ item.id }}</td>
							<td>{{ item.name }}</td>
							<td>{{ item.grade == 1 ? '일반' : '비즈니스' }}</td>
							<td>{{ item.email }}</td>
							<td>{{ $dateFormat(item.created, 'YYYY-MM-DD') }}</td>
						</tr>
					</table>
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
			allST: false,
			isItem: { id: '', grade: 2, cnt: '', dateS: '', dateE: '' },
			ticketObj: {
				name: '',
				info: '',
				grade: '',
				cnt: '',
				dateS: '',
				dateE: '',
			},
			addItemInfo: {
				info: '',
				cnt: '',
			},
			ticketList: [],
			memberList: [],
		};
	},
	created() {
		this.getMamberList();
		this.getTicket();
	},
	computed: {},
	methods: {
		getMamberList() {
			this.$apiGET('/admin/ticket/member?grade=' + this.isItem.grade).then(re => {
				for (let i = 0; i < re.length; i++) {
					re[i].st = false;
				}
				this.memberList = re;
				this.allST = false;
			});
		},
		addItem() {
			if (!this.addItemInfo.info) {
				alert('상세내용을 입력해 주세요.');
				return;
			}
			if (!this.addItemInfo.cnt) {
				alert('수량을 입력해 주세요.');
				return;
			}

			this.$apiPOST('/admin/ticket', this.addItemInfo).then(() => {
				alert('저장완료');
			});
		},
		getTicket() {
			this.$apiGET('/admin/ticket/get').then(re => {
				this.ticketList = re;
			});
		},
		saveTicket() {
			if (!this.ticketObj.name) {
				alert('서비스를 선택해 주세요.');
				return;
			}
			if (!this.ticketObj.info) {
				alert('상세내용을 선택해 주세요.');
				return;
			}
			if (!this.ticketObj.grade) {
				alert('제공범위를 선택해 주세요.');
				return;
			}
			if (!this.ticketObj.cnt) {
				alert('사용제한을 선택해 주세요.');
				return;
			}
			if (!this.ticketObj.dateS || !this.ticketObj.dateE) {
				alert('사용기간을 선택해 주세요.');
				return;
			}

			this.$apiPOST('/admin/ticket/pay', this.ticketObj).then(() => {
				alert('저장완료');
			});
		},
		allSelect() {
			for (let i = 0; i < this.memberList.length; i++) {
				this.memberList[i].st = this.allST;
			}
		},
		useTicket() {
			if (this.isItem.id == '') {
				alert('이용권을 선택해 주세요.');
				return;
			}

			let idList = [];

			for (let i = 0; i < this.memberList.length; i++) {
				if (this.memberList[i].st) {
					idList.push(this.memberList[i].id);
				}
			}

			this.$apiPOST('/admin/ticket/use', { idList: idList, item: this.isItem }).then(() => {
				alert('발송완료');
			});
		},
	},
};
</script>

<style></style>
