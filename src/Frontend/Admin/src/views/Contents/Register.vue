<template>
	<div class="content">
		<div class="section">
			<div class="section-tit">콘텐츠 등록</div>
			<div class="tab-con">
				<div class="table-text">
					<table class="table">
						<colgroup>
							<col width="15%" />
							<col width="85%" />
						</colgroup>
						<tr>
							<th>구분</th>
							<td>
								<label class="input-checkbox">
									<input type="radio" name="mode" v-model="mode" value="guide" />
									<span class="checkbox radio"></span>
									<span class="text">안심거래 가이드북</span>
								</label>
								<label class="input-checkbox">
									<input type="radio" v-model="mode" value="knowledge" />
									<span class="checkbox radio"></span>
									<span class="text">부동산 상식</span>
								</label>
								<label class="input-checkbox">
									<input type="radio" v-model="mode" value="news" />
									<span class="checkbox radio"></span>
									<span class="text">부동산 주요 뉴스</span>
								</label>
							</td>
						</tr>
						<tr>
							<th>노출</th>
							<td>
								<label class="input-checkbox">
									<input type="radio" v-model="isVisible" name="isVisible" value="Y" />
									<span class="checkbox radio"></span>
									<span class="text">노출</span>
								</label>
								<label class="input-checkbox">
									<input type="radio" v-model="isVisible" name="isVisible" value="N" />
									<span class="checkbox radio"></span>
									<span class="text">비노출</span>
								</label>
							</td>
						</tr>
						<tr>
							<th>새창이동</th>
							<td>
								<label class="input-checkbox">
									<input type="checkbox" v-model="urlNewWindow" true-value="Y" false-value="N" />
									<span class="checkbox"></span>
									<span class="text">URL연동</span>
								</label>
							</td>
						</tr>
						<tr>
							<th>내용</th>
							<td>
								<textarea class="form-control textarea" rows="5" v-model="content"></textarea>
							</td>
						</tr>
						<tr>
							<th>URL링크</th>
							<td>
								<input type="text" class="form-control" v-model="url" placeholder="https://site.com, http://site.com" />
							</td>
						</tr>
					</table>
				</div>
				<div class="btn-wrap mt-4">
					<button type="button" class="btn btn-sm btn-secondary" @click="$btnOnRouterBack()">취소</button>
					<button type="button" class="btn btn-sm btn-primary" @click="updateContent()">등록</button>
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
			mode: 'guide', //안심거래 : guide, 부동산상식 : knowledge, 부동산뉴스 : news
			isVisible: 'Y', //노출 Y,N
			urlNewWindow: 'N', //url새창
			content: '', //내용
			url: '',
		};
	},
	created() {},
	computed: {},
	methods: {
		updateContent() {
			const urlTest = /^http(s?):\/\//;
			if (this.content == '') {
				alert('내용을 입력하세요.');
				return;
			}
			if (this.urlNewWindow == 'Y' && this.url == '') {
				alert('URL링크를 입력하세요.');
				return;
			}

			if (!confirm('등록 하시겠습니까?')) {
				return;
			}

			if (this.url !== '' && !urlTest.test(this.url)) {
				this.url = 'https://'.concat(this.url);
			}

			this.$apiPOST('/admin/content/add', {
				mode: this.mode,
				isVisible: this.isVisible,
				urlNewWindow: this.urlNewWindow,
				content: this.content,
				url: this.url,
			}).then(() => {
				this.$btnOnRouterBack();
			});
		},
	},
};
</script>

<style></style>
