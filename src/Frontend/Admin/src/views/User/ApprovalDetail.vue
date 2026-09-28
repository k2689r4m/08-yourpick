<template>
	<div class="content">
		<div class="section" v-if="item">
			<div class="section-tit">승인관리</div>
			<div class="tab-con">
				<div class="table-top">
					<div class="left">
						<div class="tit">기본정보</div>
					</div>
				</div>
				<div class="table-text">
					<table class="table">
						<colgroup>
							<col width="13%" />
							<col width="20%" />
							<col width="13%" />
							<col width="20%" />
							<col width="13%" />
							<col width="20%" />
						</colgroup>
						<tr>
							<th>회원구분</th>
							<td>비즈니스회원({{ item.userType }})</td>
							<th>연락처</th>
							<td>{{ $phoneMask(item.phone) }}</td>
							<th>진행상태</th>
							<td>{{ $BIZ_STATE[item.state] }}</td>
						</tr>
						<tr>
							<th>이름</th>
							<td>{{ item.name }}</td>
							<th>이메일</th>
							<td>{{ item.email }}</td>
							<th>생년월일</th>
							<td>{{ $dateFormat(item.birthday, 'YYYY-MM-DD') }}</td>
						</tr>
					</table>
				</div>
				<div class="table-top">
					<div class="left">
						<div class="tit">추가정보</div>
					</div>
				</div>
				<div class="table-text">
					<table class="table">
						<colgroup>
							<col width="13%" />
							<col width="37%" />
							<col width="13%" />
							<col width="37%" />
						</colgroup>
						<tr>
							<th>중개사무소명</th>
							<td>{{ item.medOfficeNm }}</td>
							<th>대표자명</th>
							<td>{{ item.name }}</td>
						</tr>
						<tr>
							<th>중개사무소 주소</th>
							<td>{{ item.address }}</td>
							<th>대표 연락처</th>
							<td>{{ $phoneMask(item.telno) }}</td>
						</tr>
						<tr>
							<th>사업자 등록번호</th>
							<td>{{ item.businessNum }}</td>
							<th>중개사 등록번호</th>
							<td>{{ item.estblRegNo }}</td>
						</tr>
					</table>
				</div>
				<div class="table-top">
					<div class="left">
						<div class="tit">제출서류</div>
					</div>
				</div>
				<div class="table-text">
					<table class="table">
						<colgroup>
							<col width="13%" />
							<col width="37%" />
							<col width="13%" />
							<col width="37%" />
						</colgroup>
						<tr>
							<th>사업자등록증</th>
							<td><img :src="bizSrc" style="width: 150px; height: 150px" /></td>
							<th>중개등록증</th>
							<td><img :src="broSrc" style="width: 150px; height: 150px" /></td>
						</tr>
					</table>
				</div>
				<div class="btn-wrap mt-4">
					<button type="button" class="btn btn-sm btn-secondary" @click="$btnOnRouterBack()">목록</button>
					<button type="button" class="btn btn-sm btn-primary" v-if="item.state != 'done'" @click="updateState('done')">
						승인
					</button>
					<button type="button" class="btn btn-sm btn-danger" v-if="item.state == 'over'" @click="updateState('hold')">
						보류
					</button>
					<button type="button" class="btn btn-sm btn-danger" v-if="item.state == 'done'" @click="updateState('over')">
						승인취소
					</button>
					<div class="input-wrap mt-4">
						<span class="input-label">보류사유 : </span>
						<input type="text" class="form-control" v-model="item.memo" />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'UserDetail',
	components: {},
	data() {
		return {
			item: null,
			bizSrc: null,
			broSrc: null,
		};
	},
	created() {
		this.getItem();
	},
	computed: {},
	methods: {
		getItem() {
			this.$apiGET('/admin/biz/item?id=' + this.$route.params.id).then(re => {
				this.item = re;
				this.$apiImgGET(this.item.bizSrc).then(data => {
					this.bizSrc = data;
				});
				this.$apiImgGET(this.item.broSrc).then(data => {
					this.broSrc = data;
				});
			});
		},
		updateState(state) {
			if (!confirm('저장 하시겠습니까?')) {
				return;
			}

			if (state != 'hold') {
				this.item.memo = '';
			}

			this.$apiPOST('/admin/biz/update', {
				id: this.$route.params.id,
				state: state,
				memo: this.item.memo,
			}).then(() => {
				this.$router.go(0);
			});
		},
	},
};
</script>

<style></style>
