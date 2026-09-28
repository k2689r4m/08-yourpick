<template>
	<div class="tab-list type3">
		<button
			type="button"
			class="btn tab-btn"
			v-bind:class="{ active: tapMenu == 1 }"
			@click="(tapMenu = 1), (adr = '')"
		>
			간편검색
		</button>
		<button
			type="button"
			class="btn tab-btn"
			v-bind:class="{ active: tapMenu == 2 }"
			@click="(tapMenu = 2), (adr = '')"
		>
			소재지번으로찾기
		</button>
		<button
			type="button"
			class="btn tab-btn"
			v-bind:class="{ active: tapMenu == 3 }"
			@click="(tapMenu = 3), (adr = '')"
		>
			도로명주소로찾기
		</button>
		<div class="tab-right">
			<button type="button" class="btn tooltip-btn" @click="toggleActive('toggle')" ref="toggle">
				<span></span>간편검색이란?
			</button>
			<div class="tooltip-con">
				⊙ 올바른 검색 · 검색 방법 - 소재지번, 도로명주소, 건물명을 이용하여 간편하게 검색 할 수 있는 서비스 예) 서울
				서초구 반포대로 99 / 서울 서초구 서초동 1539-1 / 서울 서초구 우체국 / 서초구 우체국 등 토지 등기사항증명서 검색
				시 : 서초동 967 (행정구역, 지번으로 검색) 건물 등기사항증명서 검색 시 : 서초동 967 (행정구역 또는 지번으로
				검색), 서초대로 219 (도로명 또는 건물번호로 검색) 집합건물 등기사항증명서 검색 시 : 서초 푸르지오 101동 1201호
				(건물명칭, 동, 호로 검색) ※ 집합건물 검색 시 소재지번 또는 도로명, 건물명칭, 동/호를 입력 후 검색하시면 보다
				정확한 검색결과를 얻을 수 있습니다. 예) 도곡동 91-5 삼성래미안 101동 101호 / 남부순환로 2803 삼성래미안 101동
				101호 · 소재지번 - 소재지번으로 검색 올바른 소재지번 키워드 : 서울 서초구 서초동 967(O) / 서초구 서초동 967(O) /
				서초동 967(O) 잘못된 소재지번 키워드 : 서울 중구 서초동 967(X) · 도로명주소 - 도로명주소로 검색 올바른
				도로명주소 키워드 : 서울시 서초구 서초대로 219(O) / 서초구 서초대로 219(O) / 서초대로 219(O) 잘못된 도로명주소
				키워드 : 서울시 종로구 서초대로 219(X) ※ 도로명주소가 병기되지 않은 부동산 등기사항증명서는 도로명주소로
				검색되지 않을 수 있사오니 검색되지 않는 등기사항증명서는 소재지번을 입력하여 검색하시기 바랍니다. · 건물명 -
				명칭으로 검색 서울특별시 강남구 삼성동 삼성래미안(O) / 서울특별시 강남구 삼성래미안(O) / 강남구 삼성래미안(O) /
				삼성래미안(O) ※ 건물명칭이 등기기록에 기재되어 있지 않거나, 알고계신 명칭과 상이할 수 있습니다. 건물명칭으로
				원하시는 검색결과가 조회되지 않을 경우, 건물명칭을 제외한 "소재지번 또는 도로명주소"로 검색하시기 바랍니다. 예)
				도곡동 91-5 101동 101호 / 남부순환로 2803 101동 101호 ⊙ 검색 제한 · 1글자 검색제한 - 1글자만 입력 후 검색 시
				검색제한 ※ 왕, 길, 로 등 1글자만 입력 후 검색 시 너무 많은 검색결과가 조회되므로 검색을 제한함 · 시/도명만
				입력시 검색제한 - 시/도명만 입력 후 검색 시 검색제한 ※ 서울특별시, 경기도, 부산광역시 등 시/도만 입력 후 검색 시
				너무 많은 검색결과가 조회되므로 검색을 제한함 ⊙ 선택 입력 · 부동산구분, 시/도, 등기기록상태 - 부동산구분, 시/도,
				등기기록상태를 특정 조건으로 선택 후 검색 시 보다 정확한 검색결과를 얻을 수 있음
			</div>
		</div>
	</div>
	<template v-if="tapMenu == 1">
		<div class="input-wrap m-t--20 mm">
			<label class="input-label w-100">· 주 소</label>
			<input type="text" class="input-text" v-model="adr" @keyup.enter="getAddr('simple')" />
		</div>
		<ul class="report-add--list" v-if="adrList.length">
			<li class="item" v-for="(isAdr, idx) in adrList" :key="'adr3_' + idx">
				<span class="name">
					<span class="badge">도로명 주소</span>
					{{ isAdr.jibunAddr }}
				</span>
				<button type="button" class="btn btn-line btn-sm" @click="resultAddress(isAdr)">선택</button>
			</li>
		</ul>

		<div class="report-box m-t--20">
			<p>
				도로명 주소가 병기되지 않은 부동산 등기기록은 도로명주소로 조회되지 않습니다. 도로명주소로 조회되지 않는
				경우에는 지번주소를 입력하여 검색하시기 바랍니다.
			</p>
			<p>공동담보/전세목록, 매매목록을 등기기록에 포함하려면 해당 선택옵션을 체크해주세요.</p>
		</div>
		<div class="btn-wrap m-t--40">
			<button type="button" class="btn btn-big btn-primary w-160" @click="getAddr('simple')">검색</button>
		</div>
	</template>
	<template v-else-if="tapMenu == 2">
		<div class="input-wrap report-mo-input m-t--20">
			<SlimSelect class="input-select" :data="adr1" :events="adrEvent"> </SlimSelect>
			<SlimSelect class="input-select" :data="adr2" :events="adrEvent"> </SlimSelect>
			<SlimSelect class="input-select" :data="adr3" :events="adrEvent"> </SlimSelect>

			<SlimSelect v-model="selectAdr4" class="input-select">
				<option>대지</option>
				<option>산</option>
			</SlimSelect>
			<span class="unit">번지</span>
			<input type="text" class="input-text" v-model="inputAdr1" />
			<span class="unit">-</span>
			<input type="text" class="input-text" v-model="inputAdr2" />
			<button type="button" class="btn btn-normal btn-primary" @click="getAddr('jibun')">검색</button>
		</div>
		<ul class="report-add--list" v-if="adrList.length">
			<li class="item" v-for="(isAdr, idx) in adrList" :key="'adr3_' + idx">
				<span class="name">
					<span class="badge">도로명 주소</span>
					{{ isAdr.jibunAddr }}
				</span>
				<button type="button" class="btn btn-line btn-sm" @click="resultAddress(isAdr)">선택</button>
			</li>
		</ul>
	</template>
	<template v-else-if="tapMenu == 3">
		<div class="input-wrap m-t--20">
			<input
				type="text"
				class="input-text"
				placeholder="건축물 소재지를 입력하세요"
				v-model="adr"
				@keyup.enter="getAddr('road')"
			/>
			<button type="button" class="btn btn-normal btn-primary" @click="getAddr('road')">검색</button>
		</div>
		<ul class="report-add--list" v-if="adrList.length">
			<li class="item" v-for="(isAdr, idx) in adrList" :key="'adr3_' + idx">
				<span class="name">
					<span class="badge">도로명 주소</span>
					{{ isAdr.roadAddr }} {{ isAdr.bdNm }}
				</span>
				<button type="button" class="btn btn-line btn-sm" @click="resultAddress(isAdr)">선택</button>
			</li>
		</ul>
		<div class="txt-only txt-c--grey m-t--20">검색예시: 서울시 마포구 성암로 301</div>
	</template>
</template>

<script>
import { mapGetters } from 'vuex';
import SlimSelect from '@slim-select/vue';

export default {
	name: 'Alarm',
	components: { SlimSelect },
	computed: {
		...mapGetters({
			dataInfo: 'getReportInfo',
		}),
	},
	data() {
		return {
			tapMenu: 1,
			adrSt: false,

			selectAdr1: { cortarno: null, cortartp: 'city', name: '' },
			selectAdr2: { cortarno: null, cortartp: 'sec', name: '' },
			selectAdr3: { cortarno: null, cortartp: 'sec', name: '' },
			selectAdr4: '대지',
			inputAdr1: '',
			inputAdr2: '',

			adrEvent: { afterChange: this.selectAdr },
			adr1: [],
			adr2: [],
			adr3: [],

			adr: '',
			adrList: [],
		};
	},
	created() {
		this.$loadScript(
			'https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=' +
				process.env.VUE_APP_NAVER_API_ID +
				'&submodules=geocoder',
		)
			.then(() => {})
			.catch(() => {});
		window.resultAddress = this.resultAddress;
		window.resultAddressRoad = this.resultAddressRoad;

		this.init();
	},
	updated() {},
	methods: {
		init() {
			this.getAdr(1);
		},
		getAddr(mode) {
			let addr = '';
			if (mode == 'simple') {
				addr = this.adr;
			} else if (mode == 'jibun') {
				addr = this.selectAdr1.name + ' ' + this.selectAdr2.name + ' ' + this.selectAdr3.name;

				if (this.selectAdr4 == '산') {
					addr += ' 산';
				}

				addr += ' ' + this.inputAdr1;

				if (this.inputAdr2) {
					addr += '-' + this.inputAdr2;
				}
			} else if (mode == 'road') {
				addr = this.adr;
			}

			if (!addr) {
				return;
			}

			this.$apiGET('/user/addr/link?addr=' + addr).then(re => {
				this.adrList = re;
			});
		},
		toggleActive(tg) {
			this.$refs[tg].classList.contains('active')
				? this.$refs[tg].classList.remove('active')
				: this.$refs[tg].classList.add('active');
		},
		resultAddress(item) {
			const dataInfo = {
				admCd: item.admCd,
				rnMgtSn: item.rnMgtSn,
				dongNm: item.dongNm ? item.dongNm : '',
				siNm: item.siNm,
				sggNm: item.sggNm,
				emdNm: item.emdNm,
				liNm: item.liNm ? item.liNm : '',
				lnbrMnnm: item.lnbrMnnm,
				lnbrSlno: item.lnbrSlno,
				rn: item.rn,
				buldMnnm: item.buldMnnm,
				buldSlno: item.buldSlno,
				bdNm: item.bdNm,
				jibunAddr: item.jibunAddr,
				roadAddr: item.roadAddr,
                pnu: item.pnu,
			};

			this.$store.dispatch('callSetReportInfo', dataInfo);
			this.$btnOnRouter('/report/request/addressSelect');
		},
		getAdr(step, id = '') {
			this.$apiGET('/user/adr?step=' + step + '&id=' + id).then(re => {
				if (step == 1) {
					this.adr1 = [];
					this.adr2 = [{ value: { cortarno: null, cortartp: 'dvsn', name: '' }, text: '시/군/구 (필수)' }];
					this.adr3 = [{ value: { cortarno: null, cortartp: 'sec', name: '' }, text: '읍/면/동 (선택)' }];

					this.adr1.push({ value: { cortarno: null, cortartp: 'city', name: '' }, text: '시/도 (필수)' });
					for (let i = 0; i < re.length; i++) {
						this.adr1.push({ value: re[i], text: re[i].name });
					}
				} else if (step == 2) {
					this.adr2 = [];
					this.adr3 = [{ value: { cortarno: null, cortartp: 'sec', name: '' }, text: '읍/면/동 (선택)' }];
					this.adr2.push({ value: { cortarno: null, cortartp: 'dvsn', name: '' }, text: '시/군/구 (필수)' });
					for (let i = 0; i < re.length; i++) {
						this.adr2.push({ value: re[i], text: re[i].name });
					}
				} else if (step == 3) {
					this.adr3 = [];
					this.adr3.push({ value: { cortarno: null, cortartp: 'sec', name: '' }, text: '읍/면/동 (선택)' });
					for (let i = 0; i < re.length; i++) {
						this.adr3.push({ value: re[i], text: re[i].name });
					}
				}
			});
		},
		selectAdr(e) {
			const tg = e[0].value;

			if (tg?.cortartp == 'city') {
				this.selectAdr1 = tg;
				this.getAdr(2, tg.cortarno);
			} else if (tg?.cortartp == 'dvsn') {
				this.selectAdr2 = tg;
				this.getAdr(3, tg.cortarno);
			} else if (tg?.cortartp == 'sec') {
				this.selectAdr3 = tg;
			}
		},
	},
};
</script>
