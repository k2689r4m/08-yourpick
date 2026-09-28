<template>
	<div class="container">
		<div class="section">
			<div class="my-tit">
				<button type="button" class="btn btn-back m-block" @click="$btnOnRouterBack()"></button>
				내 이용권
			</div>
			<div class="tab-list type1 m-b--30">
				<button type="button" class="btn tab-btn" v-bind:class="{ active: tapMenu == 1 }" @click="tapMenu = 1">
					사용 가능한 이용권
				</button>
				<button type="button" class="btn tab-btn" v-bind:class="{ active: tapMenu == 2 }" @click="tapMenu = 2">
					이용내역
				</button>
			</div>
			<template v-if="tapMenu == 1">
				<div class="table-wrap">
					<table class="table text-center">
						<tr>
							<th>구분</th>
							<th>이용권명</th>
							<th>수량</th>
							<th>유효기간</th>
							<th>남은 일자</th>
						</tr>
						<tr>
							<td>무료이용권</td>
							<td>안심거래리포트 무료 이용권</td>
							<td>1건</td>
							<td>{{ $dateNow() }} ~ {{ $dateAdd(3) }}</td>
							<td>{{ $dateDiff($dateAdd(3), $dateNow()) }}</td>
						</tr>
						<tr>
							<td>무료이용권</td>
							<td>안심거래리포트 무료 이용권</td>
							<td>1건</td>
							<td>{{ $dateNow() }} ~ {{ $dateAdd(3) }}</td>
							<td>{{ $dateDiff($dateAdd(3), $dateNow()) }}</td>
						</tr>
					</table>
					<!-- 리스트 없을시 -->
					<!-- <div class="p-60 txt-c--grey txt-size--15 txt-center">
                사용가능한 이용권이 없습니다.
            </div> -->
				</div>
			</template>

			<template v-else-if="tapMenu == 2">
				<div class="table-wrap">
					<table class="table text-center">
						<tr>
							<th>
								<label class="input-checkbox">
									<input type="checkbox" />
									<span class="box"></span>
								</label>
							</th>
							<th>구분</th>
							<th>이용권명</th>
							<th>이용 건수</th>
							<th>발급일자</th>
							<th>비고</th>
						</tr>
						<tr>
							<td>
								<label class="input-checkbox">
									<input type="checkbox" />
									<span class="box"></span>
								</label>
							</td>
							<td>유료</td>
							<td>안심거래리포트 30건 패키지</td>
							<td>1</td>
							<td>2022.10.01</td>
							<td>제공기간내 소진형</td>
						</tr>
						<tr>
							<td>
								<label class="input-checkbox">
									<input type="checkbox" />
									<span class="box"></span>
								</label>
							</td>
							<td>유료</td>
							<td>안심거래리포트 30건 패키지</td>
							<td>1</td>
							<td>2022.10.01</td>
							<td>제공기간내 소진형</td>
						</tr>
						<tr>
							<td>
								<label class="input-checkbox">
									<input type="checkbox" />
									<span class="box"></span>
								</label>
							</td>
							<td>유료</td>
							<td>안심거래리포트 30건 패키지</td>
							<td>1</td>
							<td>2022.10.01</td>
							<td>제공기간내 소진형</td>
						</tr>
					</table>
					<!-- 리스트 없을시 -->
					<!-- <div class="p-60 txt-c--grey txt-size--15 txt-center">
                이용한 내역이 없습니다.
            </div> -->
				</div>

				<div class="pagination">
					<button type="button" class="btn first" disabled></button>
					<button type="button" class="btn prev" disabled></button>
					<button type="button" class="btn num active">1</button>
					<button type="button" class="btn num">2</button>
					<button type="button" class="btn num">3</button>
					<span class="more">...</span>
					<button type="button" class="btn num">6</button>
					<button type="button" class="btn next"></button>
					<button type="button" class="btn last"></button>
				</div>
			</template>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Main',
	components: {},
	computed: {},
	data() {
		return {
			tapMenu: 1,
		};
	},

	created() {},
	updated() {},
	methods: {},
};
</script>
