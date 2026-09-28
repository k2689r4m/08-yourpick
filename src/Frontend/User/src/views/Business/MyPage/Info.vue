<template>
	<div class="container">
		<div class="section">
			<div class="my-tit type2">내 정보 관리</div>
			<div class="my-card">
				<div class="my-card--tit">
					기본 정보<button type="button" class="btn btn-right" @click="modal2 = true">회원탈퇴</button>
				</div>
				<div class="my-photo">
					<div class="img-wrap"></div>
					<button type="button" class="btn btn-set"></button>
				</div>
				<div class="input-wrap">
					<label class="input-label">· 이름</label>
					<input type="text" class="input-text" v-model="userInfo.name" disabled />
				</div>
				<div class="input-wrap">
					<label class="input-label">· 생년월일</label>
					<input type="text" class="input-text input-date" v-model="userInfo.birthday" />
				</div>
				<div class="input-wrap">
					<label class="input-label">· 휴대폰번호</label>
					<input type="text" class="input-text" v-model="userInfo.phone1" />
					<span class="unit">-</span>
					<input type="text" class="input-text" v-model="userInfo.phone2" />
					<span class="unit">-</span>
					<input type="text" class="input-text" v-model="userInfo.phone3" />
				</div>
				<div class="input-wrap">
					<label class="input-label">· 이메일 아이디</label>
					<input type="text" class="input-text" v-model="userInfo.email" disabled />
					<span class="unit">@</span>

					<SlimSelect v-model="userInfo.emailCom" class="input-select" disabled>
						<option>naver.com</option>
						<option>nate.com</option>
						<option>hanmail.net</option>
						<option>gmail.com</option>
						<option>kakao.com</option>
					</SlimSelect>
				</div>
				<div class="input-wrap">
					<label class="input-label">· 비밀번호</label>
					<input type="password" class="input-text" value="asdasdasd" disabled />
					<button type="button" class="btn btn-line input-btn" @click="modal = true">비밀번호 변경</button>
				</div>
				<div class="hr"></div>
				<div class="btn-wrap">
					<button type="button" class="btn btn-big btn-primary" @click="updateInfo">수정 완료</button>
				</div>
			</div>
			<div class="my-card">
				<div class="my-card--tit boder-none">추가 정보</div>
				<table class="table text-left">
					<colgroup>
						<col width="25%" />
						<col width="75%" />
					</colgroup>
					<tr>
						<th>중개사무소명</th>
						<td>{{ userInfo.medOfficeNm }}</td>
					</tr>
					<tr>
						<th>대표자명</th>
						<td>{{ userInfo.name }}</td>
					</tr>
					<tr>
						<th>중개사무소 주소</th>
						<td>{{ userInfo.address }}</td>
					</tr>
					<tr>
						<th>대표 연락처</th>
						<td>{{ userInfo.telno }}</td>
					</tr>
					<tr>
						<th>사업자 등록번호</th>
						<td>{{ userInfo.businessNum }}</td>
					</tr>
					<tr>
						<th>중개사 등록번호</th>
						<td>{{ userInfo.estblRegNo }}</td>
					</tr>
				</table>
			</div>
		</div>
	</div>
	<ModalInfo v-if="modal" @closeModal="closeModal" />
	<ModalInfo2 v-if="modal2" @closeModal="closeModal" />
</template>

<script>
import { mapGetters } from 'vuex';
import SlimSelect from '@slim-select/vue';
import ModalInfo from '../../../components/Modal/MyPage/ModalInfo';
import ModalInfo2 from '../../../components/Modal/MyPage/ModalInfo2';

export default {
	name: 'Info',
	components: { ModalInfo, ModalInfo2, SlimSelect },
	computed: {
		...mapGetters({
			userInfo_: 'getUserInfo',
		}),
	},
	data() {
		return {
			modal: false,
			modal2: false,
			userInfo: {
				id: null,
				birthday: null,
				email: null,
				emailCom: null,
				name: null,
				phone: null,
				phone1: null,
				phone2: null,
				phone3: null,
				agreeSt: null,
			},
		};
	},

	created() {
		this.getInfo();
	},
	updated() {},
	methods: {
		closeModal() {
			this.modal = false;
			this.modal2 = false;
		},
		getInfo() {
			this.$apiGET('/api/mypage/info').then(re => {
				re.birthday = this.$dateFormat(re.birthday, 'YYYYMMDD');
				re.phone.replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1 $2 $3`);
				this.userInfo = re;
			});
		},
		updateInfo() {
			this.$apiPOST('/api/mypage/info/update', this.userInfo).then(re => {
				if (re) {
					this.$store.dispatch('callSetUserInfo', this.userInfo_.level);
					alert('수정 완료');
				}
			});
		},
	},
};
</script>
